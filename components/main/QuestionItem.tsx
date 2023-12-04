'use client';

import { useState } from 'react';

import { updateQuestionLikes } from '@/firebase/questions';
import { updateUserLikeQuestions } from '@/firebase/users';
import IQuestion from '@/types/questions';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';

import Likes from '../common/Likes';

interface Props {
  loadQuestions: () => void;
}
export default function Question(props: Props & IQuestion) {
  const { dataCreated, id, likes } = props;

  const [user, setUser] = useRecoilState(userState);
  const [countLikes, setCountLikes] = useState(likes);

  const likeToggle = (questionsId: string) => {
    const filterArr = user?.likeQuestions.find((question) => question === questionsId);
    const increment = filterArr ? -1 : +1;
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
        <Likes handleClick={() => likeToggle(id)} condition={!user.likeQuestions?.includes(id)} />
        <div className="min-w-[40px] pb-0.5">{countLikes}</div>
      </div>
    </div>
  );
}
