'use client';

import Button from '@/components/common/Button';
import DropDownBox from '@/components/common/DropDownBox';
import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import Pagination from '@/components/common/Pagination';
import Question from '@/components/common/Question';
import { getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { usePagination } from '@/hooks/usePagination';
import { questionCategory } from '@/utils/variable';
import IQuestion, { IQuestionCategory, getQuestionType } from '@/types/questions';
import { useEffect, useState } from 'react';
import { ButtonIcon } from '@/components/common/Icon';
import Spinner from '@/components/common/Spinner';
import { useRecoilState } from 'recoil';
import { pageState } from '@/recoil/page';

export default function Home() {
  const [pageNumber, setPageNumber] = useRecoilState(pageState);
  const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const approvedQuestions = 1; //0:대기|1:승인|2:미승인
  const [questionsCategory, setQuestionsCategory] = useState('카테고리');
  const [questionsFilter, setQuestionsFilter] = useState<getQuestionType>({
    approved: approvedQuestions,
    page: pageNumber,
  });

  const pagination = usePagination(numberOfQuestions);

  useEffect(() => {
    loadQuestions();
    getQuestionsCount(questionsFilter).then((res) => setNumberOfQuestions(res));
  }, [questionsFilter]);

  useEffect(() => {
    setQuestionsFilter((prev) => ({ ...prev, page: pageNumber }));
  }, [pageNumber]);

  const loadQuestions = () => {
    getFilteredQuestions(questionsFilter).then((res) => {
      setQuestions(res);
      setLoadingSuccess(true);
    });
  };

  const filterByPopularity = () => {
    if (questionsFilter.sortByLikes) {
      const { sortByLikes, ...newQuestionsFilter } = questionsFilter;
      setQuestionsFilter({ ...newQuestionsFilter });
    } else {
      setQuestionsFilter({ ...questionsFilter, sortByLikes: 'desc' });
    }
  };

  const filterByCategory = (category: '미적용' & IQuestionCategory) => {
    if (category === '미적용') {
      const { category, ...newQuestionsFilter } = questionsFilter;
      setQuestionsFilter({ ...newQuestionsFilter });
    } else {
      setQuestionsFilter({ ...questionsFilter, category });
    }
  };

  const filterBySearchKeyword = (inputValue: string) => {
    setQuestionsFilter({ ...questionsFilter, searchKeyword: inputValue });
  };

  return (
    <>
      <div
        className="flex justify-between"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="mr-1 flex gap-1">
          <DropDownBox
            boxStyles={`px-2 py-1.5 text-xs items-center border-deepGreen text-deepGreen  ${
              questionsFilter.category && 'bg-deepGreen text-white '
            }`}
            dropBoxStyles="min-w-[270px]"
            defaultValue={questionsCategory}
            arrowColor="white"
            dropDownList={['미적용', ...questionCategory]}
            onChange={(value) => {
              setQuestionsCategory(value !== '미적용' ? value : '카테고리');
              filterByCategory(value as '미적용' & IQuestionCategory);
            }}
          />
          <Button
            btnStyle="sm-line-deepGreen"
            styles={`${
              questionsFilter.sortByLikes && 'bg-deepGreen text-white'
            }  right-[20px] top-[0]  whitespace-nowrap`}
            handleClick={() => {
              filterByPopularity();
            }}
          >
            인기순
          </Button>
        </div>

        <form
          className="relative flex w-full justify-end"
          onSubmit={(e) => {
            e.preventDefault();
            const inputValue = e.target[0].value;
            filterBySearchKeyword(inputValue);
          }}
        >
          <input
            className="input-primary h-full w-[100px] max-w-[250px] rounded-lg border-deepGreen bg-white px-2 py-1.5 text-xs outline-none duration-100 focus:w-full"
            placeholder="검색"
          />
          <ButtonIcon
            iconName="search"
            btnType="submit"
            svgStyles="h-6 w-6 fill-deepGreen"
            buttonStyles="absolute right-1 top-2/4 translate-y-[-50%] p-0"
          />
        </form>
      </div>
      {!loadingSuccess ? (
        <Spinner />
      ) : (
        <>
          {questions.length === 0 ? (
            <div className="mt-4">검색조건과 일치하는 데이터가 없습니다.</div>
          ) : (
            <>
              <div className="mt-4">
                {questions.map((question) => (
                  <Question key={question.id} {...question}>
                    <LikeQuestionPart {...question} />
                  </Question>
                ))}
              </div>
              <Pagination
                {...pagination}
                handleChangePage={(page) => {
                  // setQuestionsFilter((prev) => ({ ...prev, page: pageNumber }));
                  setPageNumber(page);
                  pagination.handleChangePage(page);
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
