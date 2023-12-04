'use client';

import { useState } from 'react';

import { updateQuestionLikes } from '@/firebase/questions';
import { updateUserLikeQuestions } from '@/firebase/users';
import IQuestion from '@/types/questions';
import Icon from '../common/Icon';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { useToggle } from '@/hooks/useToggle';

interface Props {
  loadQuestions: () => void;
}
export default function Question(props: Props & IQuestion) {
  const { dataCreated, id, likes } = props;

  const [user, setUser] = useRecoilState(userState);
  const [countLikes, setCountLikes] = useState(likes);
  const { isOff, handleToggle } = useToggle();

  const likeToggle = (questionsId: string) => {
    const filterArr = user?.likeQuestions.find((question) => question === questionsId);
    const increment = filterArr ? -1 : +1;
    handleToggle();

    updateQuestionLikes(questionsId, increment).then(() => {
      updateUserLikeQuestions(user?.id, questionsId);
      setUser((prev) => ({
        ...prev,
        likeQuestions: filterArr
          ? prev.likeQuestions.filter((e) => e !== questionsId)
          : [...prev.likeQuestions, questionsId],
      }));
      setCountLikes((prev) => (filterArr ? prev - 1 : prev + 1));
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
          onMouseEnter={() => handleToggle(true)}
          onMouseLeave={() => handleToggle(false)}
        >
          {isOff && !user.likeQuestions.includes(id) ? (
            <Icon name="heart" className="h-6 w-6" />
          ) : (
            <Icon name="heartFill" className="h-6 w-6" />
          )}
        </button>
        <div className="pb-0.5">{countLikes}</div>
      </div>
    </div>
  );
}
