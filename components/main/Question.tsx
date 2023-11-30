'use client';

import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { createQuestion, getFilteredQuestions, getQuestionsCount } from '@/firebase/questions';
import { getUser } from '@/firebase/users';

export default function Question() {
  const { data: session } = useSession();
  const inputTitleRef = useRef(null);
  const inputAnswerRef = useRef(null);

  return (
    <>
      Question
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(session);
          console.log(inputTitleRef.current?.['value']);
          console.log(inputAnswerRef.current?.['value']);
          const title = inputTitleRef.current?.['value'];
          const answer = inputAnswerRef.current?.['value'];

          const category = 'JS';
          if (title && answer) {
            const body = {
              category: category,
              title,
              answer,
              userId: '001',
            };
            createQuestion(body);
          }
          alert('제출완료');
        }}
      >
        <input ref={inputTitleRef} placeholder="title" />
        <input ref={inputAnswerRef} placeholder="answer" />
        <button type="submit">제출</button>
      </form>
      <button
        onClick={() => {
          // getFilteredQuestions({})
          //   getUser({ id: '2023-12-30T09:09:48.405Z', email: 'kingryan9996@gmail.com' });
          getUser({ email: 'kingryan9996@gmail.com' });
        }}
      >
        필터링으로 질문 조회
      </button>
      <br />
      <button onClick={getQuestionsCount}>전체 질문 갯수</button>
    </>
  );
}
