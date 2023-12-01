import { useModal } from '@/hooks/useModal';
import React, { useState } from 'react';
import Icon from '../common/Icon';
import Button from '../common/button/Button';

interface Props {
  title: string;
  answer: string;
  category: string;
}

const EditQuestion = (props: Props) => {
  const { title, answer, category } = props;
  const [value, setValue] = useState<Props>({ title, answer, category });
  const { closeModal } = useModal();
  const handleSubmit = () => {
    console.log(value);
  };
  return (
    <article className="relative flex h-full max-h-[1000px]  w-screen max-w-[600px] flex-col gap-3 bg-white p-6">
      <section className="text-center">
        <h1>질문 수정하기</h1>
        <Button btnStyle="btn-ghost" handleClick={closeModal} styles="absolute top-2 right-2">
          <Icon name="close" className="h-8 w-8" />
        </Button>
      </section>
      <section className="py-4">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="flex flex-col gap-2 text-sm">
            질문
            <input
              type="text"
              placeholder={value.title}
              value={value.title}
              className="rounded-md border border-lightGray p-3 text-sm"
              onChange={(e) => setValue((prev) => ({ ...prev, title: e.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm ">
            답변
            <textarea
              value={value.answer}
              placeholder={value.answer}
              className="min-h-[320px] resize-none rounded-md border border-lightGray  p-3 text-sm"
              onChange={(e) => setValue((prev) => ({ ...prev, answer: e.target.value }))}
            />
          </label>
          <Button
            type="submit"
            btnStyle="btn-state-lg"
            styles="w-full bg-deepGreen text-white border-deepGreen"
          >
            수정하기
          </Button>
        </form>
      </section>
    </article>
  );
};

export default EditQuestion;
