'use client';

import { useRef, useState } from 'react';
import Button from './Button';
import DropDownBox from './DropDownBox';
import { LabeledInput } from './Input';
import { Labeled } from './layout/AppLayout';
import { createQuestion, updateQuestion } from '@/firebase/questions';
import { questionCategory } from '@/utils/variable';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import QuestionTag from './QuestionTag';

const initialQuestionValue = { category: [], title: '', answer: '', tags: [] };

interface QuestionsFormProps {
  question?: {
    questionId: string;
    category: string[];
    title: string;
    answer: string;
    tags?: string[];
  };
  handleClick?: () => void;
}

export default function QuestionForm({ question, handleClick }: QuestionsFormProps) {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [questionValue, setQuestionValue] = useState(question ?? initialQuestionValue);

  const handleSubmit = () => {
    if (questionValue.category.length === 0) {
      alert('카테고리를 선택해주세요.');
    } else {
      if (question) {
        const body = {
          category: questionValue.category,
          title: questionValue.title,
          answer: questionValue.answer,
          tags: questionValue.tags,
        };
        updateQuestion(question.questionId, body);
        router.push(`questions/${question.questionId}`);
      } else {
        const id = uuidv4();
        const body = {
          id,
          category: questionValue.category,
          title: questionValue.title,
          answer: questionValue.answer,
          userId: user.id,
          tags: questionValue.tags,
        };
        createQuestion(body).then(() => {
          setQuestionValue(initialQuestionValue);
          router.push(`questions/${id}`);
        });
      }
      if (handleClick) handleClick();
    }
  };

  const changeValue = (key: 'category' | 'title' | 'answer' | 'tags', value: string | string[]) => {
    setQuestionValue({ ...questionValue, [key]: value });
  };
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragStart = (index: number) => {
    dragItem.current = index;
  };
  const dragEnter = (index: number) => {
    dragOverItem.current = index;
  };
  const drop = () => {
    const newList = [...questionValue.category];
    const dragItemValue = newList[dragItem.current];
    newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    changeValue('category', newList);
  };
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <DropDownBox
        defaultValue={'카테고리 선택'}
        dropDownList={questionCategory}
        onChange={(value) => {
          if (questionValue.category.includes(value)) {
            alert('이미 추가된 카테고리입니다.');
          } else if (questionValue.category.length < 3) {
            changeValue('category', [...questionValue.category, value]);
          }
        }}
      />
      {questionValue.category.length > 0 && (
        <div className="input-primary flex gap-2 border p-2">
          {questionValue.category.map((item, index) => (
            <div
              key={`category_btn_${item}_${index}`}
              draggable
              onDragStart={() => dragStart(index)}
              onDragEnter={() => dragEnter(index)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Button
                btnStyle="sm-line-deepGreen"
                handleClick={() => {
                  const newArr = questionValue.category.filter((g) => g !== item);
                  changeValue('category', newArr);
                }}
              >
                {item}
              </Button>
            </div>
          ))}
        </div>
      )}
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
          className="input-primary min-h-[21rem] resize-none"
          placeholder="답변을 입력해주세요"
          required
        />
      </Labeled>
      <QuestionTag handleChange={(tags) => changeValue('tags', tags)} tags={questionValue.tags} />
      <Button type="submit" btnStyle="lg-fill-deepGreen">
        작성
      </Button>
    </form>
  );
}
