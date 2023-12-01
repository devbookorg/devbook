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
import Heart from '@/assets/icons/heart.svg';
import HeartFill from '@/assets/icons/heartFill.svg';
import Icon from '../common/Icon';
import Button from '../common/button/Button';
import formatUnixTime from '@/utils/functions/formatUnixTime';

interface QuestionProps {
  question: IQuestion;
}
export default function Question({ question }: QuestionProps) {
  // console.log(question);
  const date = new Date(question.dataCreated.seconds * 1000);
  // console.log(date, '날짜');

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const likeToggle = (questionsId: string) => {
    console.log(question);
    console.log(questionsId);
    // 유저데이터불러와서 - 좋아요누른배열데이터에 ' questionsId들어있으면?+1:-1

    updateQuestionLikes(questionsId, +1).then(() => {
      updateUserLikeQuestions('58f6e3b6-b61d-477f-b728-73816391ee0c', questionsId);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-gray px-4 py-5">
        <div className="grid gap-2">
          <Button btnStyle={`btn-${question.category}`} styles="btn-categoryBtn">
            {question.category}
          </Button>
          <strong className="text-lg font-semibold">{question.title}</strong>
          <span>{question.answer}</span>
        </div>

        <div className="flex flex-col items-end gap-5">
          <span>{formatUnixTime(question.dataCreated.seconds)}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                console.log(question);
                likeToggle(question.id);
              }}
              className="w-fit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isHovered ? <Icon name="heartFill" /> : <Icon name="heart" />}
            </button>
            <span className="text-xl">{question.likes}</span>
          </div>
        </div>
      </div>
    </>
  );
}
