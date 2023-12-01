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

interface Props {}
export default function Question(props: Props & IQuestion) {
  const { dataCreated, id, likes } = props;

  const date = new Date(dataCreated.seconds * 1000);
  console.log(date, '날짜');

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const likeToggle = (questionsId, currentLikes) => {
    updateUserLikeQuestions('9bdad09e-e243-4a57-b3e1-2baad6960ba2', questionsId).then((res) =>
      console.log('결과물 : ', res)
    );
    // updateQuestionLikes();
  };

  return (
    <div className="flex flex-col items-end gap-5">
      <span className="text-xs text-gray">{formatUnixTime(dataCreated.seconds)}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            likeToggle(id, likes);
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
