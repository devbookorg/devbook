import React, { useState } from 'react';
import Button from '../common/Button';

interface Props {
  handleAddComments: ({ text, rootComment }: { text: string; rootComment?: string }) => void;
  rootComment?: string;
}

const CommentForm = (props: Props) => {
  const { handleAddComments, rootComment } = props;
  const [value, setValue] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.length) {
      return;
    }
    handleAddComments({ text: value, rootComment });
    setValue('');
  };
  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <label title="댓글" htmlFor="comment-textarea" className="text-xs">
        댓글
      </label>
      <div className="relative">
        <textarea
          id="comment-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="min-h-[64px] w-full resize-none rounded-md border border-gray bg-white p-2 pr-14 text-sm outline-deepGreen"
        />
        <Button type="submit" btnStyle="sm-fill-deepGreen" styles="absolute right-2 bottom-4">
          작성
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
