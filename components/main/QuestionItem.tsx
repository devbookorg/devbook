'use client';

import { useState } from 'react';

import { updateQuestionLikes } from '@/firebase/questions';
import { updateUserLikeQuestions } from '@/firebase/users';
import IQuestion from '@/types/questions';
import Icon from '../common/Icon';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import IUser from '@/types/users';
import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/user';

interface Props {
  user: IUser;
  loadQuestions: () => void;
}
export default function Question(props: Props & IQuestion) {
  const { dataCreated, id, likes, user } = props;
  const [isHovered, setIsHovered] = useState(false);

  const setUserState = useSetRecoilState(userState);
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
      setUserState((prev) => ({ ...prev, likeQuestions: [] }));
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
