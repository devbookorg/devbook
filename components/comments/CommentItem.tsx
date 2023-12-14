import IComment from '@/types/comments';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import React from 'react';
import CommentEmojis from './CommentEmojis';
import { useToggle } from '@/hooks/useToggle';
import { ButtonIcon } from '../common/Icon';
import CommentForm from './CommentForm';

interface Props {
  idx: number;
  user: string;
}

const Comment = (props: Props & IComment) => {
  const { text, idx, dataCreated, emojis, user, id, questionId } = props;
  const { isOff: replyFormOff, handleToggle } = useToggle();
  return (
    <>
      <article className="flex flex-col gap-1.5">
        <section className="flex justify-between text-xs">
          <h3 className="text-deepGreen">{`#${idx}`}</h3>
          <span className="text-gray">{formatUnixTime(dataCreated.seconds)}</span>
        </section>
        <section className="mb-2 overflow-hidden">
          <p className="pb-1 pl-1 text-sm">{text}</p>
          <div className="flex items-center justify-between">
            <ButtonIcon
              iconName="cornerDownRight"
              svgStyles="w-3 h-3 stroke-gray"
              text="답글"
              buttonStyles="flex items-center gap-1 text-gray"
              handleClick={() => handleToggle()}
            />
            <CommentEmojis {...emojis} user={user} commentId={id} />
          </div>
        </section>

        {!replyFormOff && (
          <section className="mb-2 pl-4">
            <CommentForm userId={user} questionId={questionId} commentId={id} />
          </section>
        )}
      </article>
      <hr className="border-lightGray" />
    </>
  );
};

export default Comment;
