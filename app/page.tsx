'use client';

import Button from '@/components/common/Button';
import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import Pagination from '@/components/common/Pagination';
import Question from '@/components/common/Question';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { usePagination } from '@/hooks/usePagination';

import IQuestion, { getQuestionType } from '@/types/questions';
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

  return (
    <>
      <div
        className="flex justify-end"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          btnStyle="sm-line-deepGreen"
          styles={`${
            questionsFilter.sortByLikes && 'bg-deepGreen text-white'
          }  right-[20px] top-[0]`}
          handleClick={() => {
            loadQuestionsSortByPopularity();
          }}
        >
          인기순
        </Button>
      </div>
      <div className="mt-4">
        {questions.map((question) => (
          <Question key={question.id} {...question}>
            <LikeQuestionPart {...question} loadQuestions={loadQuestions} />
          </Question>
        ))}
      </div>
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
