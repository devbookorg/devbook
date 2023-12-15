'use client';
import QuestionForm from '@/components/common/QuestionForm';
import Spinner from '@/components/common/Spinner';
import { getQuestion } from '@/firebase/questions';
import IQuestion from '@/types/questions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Write() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get('question');
  const [question, setQuestion] = useState<IQuestion | undefined>();

  useEffect(() => {
    if (questionId) {
      getQuestion(questionId).then((res) => {
        setQuestion(res);
      });
    }
  }, [questionId]);

  if (questionId && !question) {
    return <Spinner />;
  }

  return (
    <>
      <QuestionForm question={question ? { questionId: question?.id, ...question } : undefined} />
    </>
  );
}
