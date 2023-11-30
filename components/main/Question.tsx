'use client';

import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { createQuestion, getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { getUser } from '@/firebase/users';
import IQuestion from '@/types/questions';

interface QuestionProps {
  question: IQuestion;
}
export default function Question({ question }: QuestionProps) {
  return (
    <>
      <div className="border-b-2 border-gray px-4 py-5">
        {question.title}
        <br />
        {question.answer}
      </div>
    </>
  );
}
