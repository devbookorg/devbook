'use client';
import QuestionForm from '@/components/common/QuestionForm';
import { useSearchParams } from 'next/navigation';

export default function Write() {
  const searchParams = useSearchParams();
  const propsQuestion = JSON.parse(searchParams.get('writeProps'));

  return (
    <>
      <QuestionForm question={propsQuestion} />
    </>
  );
}
