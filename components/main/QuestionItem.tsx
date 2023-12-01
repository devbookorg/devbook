'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  createQuestion,
  getFilteredQuestions,
  getQuestionsCount,
  updateQuestionLikes,
} from '@/firebase/questions';
import { getUser, updateUserLikeQuestions } from '@/firebase/users';
import IQuestion from '@/types/questions';
import Icon from '../common/Icon';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import IUser from '@/types/users';
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from 'recoil';
import { userMailState, userStateQuery } from '@/recoil/user';

interface Props {
  user: IUser;
  loadQuestions: () => void;
}
export default function Question(props: Props & IQuestion) {
  const { dataCreated, id, likes, user, loadQuestions } = props;
  const [isHovered, setIsHovered] = useState(false);
  const refresh = useRecoilRefresher_UNSTABLE(userStateQuery);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const likeToggle = (questionsId: string) => {
    const filterArr = user?.likeQuestions.find((question) => question === questionsId);
    const increment = filterArr ? -1 : +1;

    updateQuestionLikes(questionsId, increment).then(() => {
      updateUserLikeQuestions(user?.id, questionsId);
      loadQuestions();
      refresh();
    });
  };

  return (
    <div className="flex flex-col items-end gap-5">
      <span className="text-xs text-gray">{formatUnixTime(dataCreated.seconds)}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            likeToggle(id);
          }}
          className="w-fit"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ? (
            <Icon name="heartFill" className="h-6 w-6" />
          ) : (
            <Icon name="heart" className="h-6 w-6" />
          )}
        </button>
        <div className="pb-0.5">{likes}</div>
      </div>
    </div>
  );
}
