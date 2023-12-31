'use client';

import { useState } from 'react';

import { updateQuestionLikes } from '@/firebase/questions';
import { updateUserLikeQuestions } from '@/firebase/users';
import IQuestion from '@/types/questions';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';

import Likes from '../common/Likes';

interface Props {}
userState;
export default function LikeQuestionPart(props: Props & IQuestion) {
  const { id, likes } = props;

  const [user, setUser] = useRecoilState(userState);
  const [countLikes, setCountLikes] = useState(likes);

  const likeToggle = (questionsId: string) => {
    if (user.id !== '') {
      const filterArr = user?.likeQuestions.find((question) => question === questionsId);
      const increment = filterArr ? -1 : +1;
      setUser((prev) => ({
        ...prev,
        likeQuestions: filterArr
          ? prev.likeQuestions.filter((e) => e !== questionsId)
          : [...prev.likeQuestions, questionsId],
      }));
      setCountLikes((prev) => (filterArr ? prev - 1 : prev + 1));
      updateQuestionLikes(questionsId, increment).then(() => {
        updateUserLikeQuestions(user?.id, questionsId);
      });
    } else {
      alert('로그인을 해주세요');
    }
  };

  return (
    <div className="flex flex-col items-end justify-end gap-5">
      <div className="flex items-center gap-2">
        <Likes handleClick={() => likeToggle(id)} condition={!user.likeQuestions?.includes(id)} />
        <div className="max-w-[40px] pb-0.5">{countLikes}</div>
      </div>
    </div>
  );
}
