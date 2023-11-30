'use client';
import DropDownBox from '@/components/common/DropDownBox';
import { LabeledInput } from '@/components/common/Input';
import Button from '@/components/common/button/Button';
import { Labeled } from '@/components/common/layout/Layout';
import { questionCategory } from '@/utils/variable';
import { useState } from 'react';
import { getUser } from '@/firebase/users';
import { createQuestion } from '@/firebase/questions';

const initialQuestionValue = { category: '카테고리 선택', title: '', answer: '' };

export default function Write() {
  const [questionValue, setQuestionValue] = useState(initialQuestionValue);

  const handleSubmit = () => {
    if (questionValue.category === '카테고리 선택') {
      alert('카테고리를 선택해주세요.');
    } else {
      getUser({ email: 'kingryan9996@gmail.com' }).then((res) => {
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
    <>
      <div>
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
      </div>
    </>
  );
}
