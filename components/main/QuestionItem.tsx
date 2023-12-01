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

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const likeToggle = (questionsId: string) => {
    updateQuestionLikes(questionsId, +1).then(() => {
      updateUserLikeQuestions('58f6e3b6-b61d-477f-b728-73816391ee0c', questionsId);
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
