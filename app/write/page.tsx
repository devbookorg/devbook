'use client';
import DropDownBox from '@/components/common/DropDownBox';
import { LabeledInput } from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Labeled } from '@/components/common/layout/Layout';
import { questionCategory } from '@/utils/variable';
import { useState } from 'react';
import { getUser } from '@/firebase/users';
import { createQuestion } from '@/firebase/questions';
import QuestionForm from '@/components/common/Form';

const initialQuestionValue = { category: '카테고리 선택', title: '', answer: '' };

export default function Write() {
  return (
    <>
      <div>
        <QuestionForm />
      </div>
    </>
  );
}
