'use client';

import { useState } from 'react';
import Button from './Button';
import DropDownBox from './DropDownBox';
import { LabeledInput } from './Input';
import { Labeled } from './layout/Layout';
import { getUser } from '@/firebase/users';
import { createQuestion } from '@/firebase/questions';
import { questionCategory } from '@/utils/variable';
import { useRecoilValue } from 'recoil';
import { userStateQuery } from '@/recoil/user';

const initialQuestionValue = { category: '카테고리 선택', title: '', answer: '' };

export default function QuestionForm() {
  const user = useRecoilValue(userStateQuery);
  const [questionValue, setQuestionValue] = useState(initialQuestionValue);

  const handleSubmit = () => {
    if (questionValue.category === '카테고리 선택') {
      alert('카테고리를 선택해주세요.');
    } else {
      getUser({ email: user?.email as string }).then((res) => {
        if (res) {
          const body = {
            category: questionValue.category,
            title: questionValue.title,
            answer: questionValue.answer,
            userId: res.id,
          };
          createQuestion(body).then(() => {
            setQuestionValue(initialQuestionValue);
          });
        }
      });
    }
  };

  const changeValue = (key: 'category' | 'title' | 'answer', value: string) => {
    setQuestionValue({ ...questionValue, [key]: value });
  };

  return (
    <form
      className="grid gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <DropDownBox
        defaultValue={questionValue.category}
        dropDownList={questionCategory}
        onChange={(value) => changeValue('category', value)}
      />
      <LabeledInput
        label="문제"
        value={questionValue.title}
        placeholder="제목을 입력해주세요"
        onChange={(value) => changeValue('title', value)}
        required
      />

      <Labeled label="답변">
        <textarea
          value={questionValue.answer}
          onChange={(e) => {
            changeValue('answer', e.target.value);
          }}
          className="input-primary h-80 resize-none"
          placeholder="답변을 입력해주세요"
          required
        />
      </Labeled>
      <Button type="submit" btnStyle="btn-fill">
        작성
      </Button>
    </form>
  );
}
