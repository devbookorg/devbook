'use client';

import Button from '@/components/common/Button';
import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import Pagination from '@/components/common/Pagination';
import Question from '@/components/common/Question';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { usePagination } from '@/hooks/usePagination';

import IQuestion, { getQuestionType } from '@/types/questions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 1; //0:대기|1:승인|2:미승인
  const [questionsFilter, setQuestionsFilter] = useState<getQuestionType>({
    approved: approvedQuestions,
    page: 1,
  });

  const pagination = usePagination(numberOfQuestions);

  useEffect(() => {
    loadQuestions();
    getQuestionsCount(questionsFilter).then((res) => setNumberOfQuestions(res));
  }, [questionsFilter]);

  const loadQuestions = () => {
    getFilteredQuestions(questionsFilter).then((res) => {
      setQuestions(res);
    });
  };

  const loadQuestionsSortByPopularity = () => {
    if (questionsFilter.sortByLikes) {
      setQuestionsFilter({ approved: approvedQuestions });
    } else {
      setQuestionsFilter({ ...questionsFilter, sortByLikes: 'desc' });
    }
  };
  console.log('questionsFilter :', questionsFilter);
  console.log(questionsFilter.sortByLikes);
  return (
    <>
      전체 질문 수 : {numberOfQuestions}
      <Button
        btnStyle="btn-primary"
        styles={`${questionsFilter.sortByLikes && 'bg-deepGreen text-white'}`}
        handleClick={() => {
          loadQuestionsSortByPopularity();
        }}
      >
        인기순
      </Button>
      {questions.map((question) => (
        <Question key={question.id} {...question}>
          <LikeQuestionPart {...question} loadQuestions={loadQuestions} />
        </Question>
      ))}
      <Pagination
        {...pagination}
        handleChangePage={(page) => {
          setQuestionsFilter((prev) => ({ ...prev, page }));
          pagination.handleChangePage(page);
        }}
      />
    </>
  );
}
