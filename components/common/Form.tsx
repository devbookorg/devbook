'use client';

import { useState } from 'react';
import Button from './Button';
import DropDownBox from './DropDownBox';
import { LabeledInput } from './Input';
import { Labeled } from './layout/Layout';
import { getUser } from '@/firebase/users';
import { createQuestion, updateQuestion } from '@/firebase/questions';
import { questionCategory } from '@/utils/variable';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';

const initialQuestionValue = { category: '카테고리 선택', title: '', answer: '' };

interface QuestionsFormProps {
  question?: { questionId: string; category: string; title: string; answer: string };
  handleClick?: () => void;
}

export default function QuestionForm({ question, handleClick }: QuestionsFormProps) {
  const user = useRecoilValue(userState);
  const [questionValue, setQuestionValue] = useState(question ?? initialQuestionValue);

  const handleSubmit = () => {
    if (questionValue.category === '카테고리 선택') {
      alert('카테고리를 선택해주세요.');
    } else {
      if (question) {
        const body = {
          category: questionValue.category,
          title: questionValue.title,
          answer: questionValue.answer,
        };
        updateQuestion(question.questionId, body);
      } else {
        const body = {
          category: questionValue.category,
          title: questionValue.title,
          answer: questionValue.answer,
          userId: user.id,
        };
        createQuestion(body).then(() => {
          setQuestionValue(initialQuestionValue);
        });
      }
      if (handleClick) handleClick();
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
