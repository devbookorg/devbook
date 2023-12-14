import { useToggle } from '@/hooks/useToggle';
import { emojis } from '@/utils/variable';
import React from 'react';
import Button from '../common/Button';
import IComment from '@/types/comments';

interface Props {
  handleUpdateComments: (emoji: string) => void;
}

const CommentEmojis = (props: Props & IComment['emojis']) => {
  const { handleUpdateComments, ...rest } = props;
  const { isOff, handleToggle } = useToggle();
  const checkEmojis = [...Object.values(rest)].flat()?.length;
  return (
    <div className="relative text-right">
      <Button
        btnStyle="sm-line-deepGreen"
        handleClick={() => handleToggle()}
        styles={`bg-white flex gap-1 ${checkEmojis ? 'rounded-full' : ''} ${
          isOff ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {checkEmojis ? (
          <>
            {Object.keys(rest)
              .filter((e) => rest[e].length)
              .map((emoji) => (
                <div key={emoji} className="flex items-center gap-1">
                  <span>{emojis[emoji]}</span>
                  <span>{props[emoji].length}</span>
                </div>
              ))}
          </>
        ) : (
          <>{emojis.thumbsUp}</>
        )}
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
            handleClick={() => {
              handleUpdateComments(emoji);
              handleToggle(true);
            }}
          >
            <span>{emojis[emoji]}</span>
            <span>{props[emoji].length}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CommentEmojis;
