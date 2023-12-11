'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import {
  getFilteredQuestions,
  getLikesQuestions,
  getQuestionsCount,
  updateQuestionsNotification,
} from '@/firebase/questions';
import { userState } from '@/recoil/user';
import IQuestion from '@/types/questions';
import { useRecoilValue } from 'recoil';
import Question from '@/components/common/Question';
import QuestionItem from '@/components/user/QuestionItem';
import { DeleteUserAndLogout } from '@/components/user/DeleteUserAndLogout';
import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import Pagination from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';

const UserPage = () => {
  const user = useRecoilValue(userState);
  const { id, name } = user;
  const [myWroteQuestions, setMyWroteQuestions] = useState<IQuestion[]>([]);
  const [myLikeQuestions, setMyLikeQuestions] = useState<IQuestion[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [wroteQuestionsCount, setWroteQuestionsCount] = useState<number>(0);
  const [likeQuestionsCount, setLikeQuestionsCount] = useState<number>(0);
  const viewQuestions = selectedTab === 0 ? myWroteQuestions : myLikeQuestions;
  const tabs = ['작성한 게시물', '좋아요'];
  const pagination = usePagination(selectedTab === 0 ? wroteQuestionsCount : likeQuestionsCount);
  useEffect(() => {
    if (user.email !== '') {
      loadWroteQuestions();
      loadMyLikesQuestions();
      updateQuestionsNotification(user.id);
    }
  }, [user]);

  const loadWroteQuestions = () => {
    getFilteredQuestions({ userId: user.id }).then((res) => setMyWroteQuestions(res));
    getQuestionsCount({ userId: user.id }).then((res) => setWroteQuestionsCount(res));
  };
  const loadMyLikesQuestions = () => {
    getLikesQuestions(user.likeQuestions).then((res) => {
      setMyLikeQuestions(res.questions);
      setLikeQuestionsCount(res.total);
    });
  };

  const onChangePage = (page: number) => {
    selectedTab === 0
      ? getFilteredQuestions({ userId: user.id, page }).then((res) => setMyWroteQuestions(res))
      : getLikesQuestions(user.likeQuestions, page).then((res) =>
          setMyLikeQuestions(res.questions)
        );
    pagination.handleChangePage(page);
  };

  return (
    <article className="flex flex-col ">
      <section className="flex items-center gap-2 pl-2 ">
        <b className="text-lg">{name}</b>님
      </section>
      <div className="flex">
        {tabs.map((e, i) => (
          <div
            key={e}
            className={` relative w-full before:absolute before:bottom-0 before:left-0  before:border-b-2 before:border-deepGreen  before:content-[''] ${
              selectedTab === i
                ? 'before:w-full before:duration-300'
                : 'before:w-0 before:duration-0'
            }`}
          >
            <Button
              type="button"
              btnStyle="lg-ghost"
              styles="w-full"
              handleClick={() => setSelectedTab(i)}
            >
              {e}
            </Button>
          </div>
        ))}
      </div>
      {viewQuestions.length > 0 ? (
        <>
          <div>
            {viewQuestions.map((question) => (
              <Question key={question.id} {...question}>
                {selectedTab === 0 ? (
                  <QuestionItem
                    user={user.id}
                    {...question}
                    loadWroteQuestions={loadWroteQuestions}
                  />
                ) : (
                  <LikeQuestionPart {...question} loadQuestions={loadMyLikesQuestions} />
                )}
              </Question>
            ))}
          </div>
          <Pagination {...pagination} handleChangePage={onChangePage} />
        </>
      ) : (
        <div className="p-4 pb-0">
          {selectedTab === 0 ? '작성한 게시물이 없습니다.' : "'좋아요'한 게시물이 없습니다."}
        </div>
      )}
      <DeleteUserAndLogout userId={id} />
    </article>
  );
};

export default UserPage;
