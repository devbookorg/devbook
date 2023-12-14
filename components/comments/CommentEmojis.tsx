import { useToggle } from '@/hooks/useToggle';
import { emojis } from '@/utils/variable';
import React from 'react';
import Button from '../common/Button';
import IComment from '@/types/comments';

interface Props {}

const CommentEmojis = (props: Props & IComment['emojis']) => {
  const { isOff, handleToggle } = useToggle();
  return (
    <div className="relative text-right">
      <Button
        btnStyle="sm-line-deepGreen"
        handleClick={() => handleToggle()}
        styles={isOff ? 'translate-x-0' : 'translate-x-full'}
      >
        {emojis.thumbsUp}
      </Button>
      <div
        className={`absolute bottom-0 right-0 flex ${
          isOff ? 'translate-x-full' : 'translate-x-0'
        } rounded-full border border-deepGreen bg-white duration-300`}
      >
        {Object.keys(emojis).map((emoji) => (
          <Button
            btnStyle="sm-ghost"
            key={emoji}
            styles="flex gap-2"
            handleClick={() => handleToggle(true)}
          >
            <span>{emojis[emoji]}</span>
            <span>{props[emoji]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CommentEmojis;
