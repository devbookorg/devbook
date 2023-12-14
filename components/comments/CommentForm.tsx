import React, { useState } from 'react';
import Button from '../common/Button';

const CommentForm = () => {
  const [value, setValue] = useState<string>('');
  return (
    <form className="flex w-full flex-col gap-2">
      <label title="댓글" htmlFor="comment-textarea" className="text-xs">
        댓글
      </label>
      <div className="relative">
        <textarea
          id="comment-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="min-h-[64px] w-full resize-none rounded-md border border-gray p-2 pr-14 text-sm outline-deepGreen"
        />
        <Button type="submit" btnStyle="sm-fill-deepGreen" styles="absolute right-2 bottom-4">
          작성
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;