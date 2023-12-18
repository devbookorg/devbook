import IComment from '@/types/comments';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import React from 'react';
import CommentEmojis from './CommentEmojis';
import { useToggle } from '@/hooks/useToggle';
import { ButtonIcon } from '../common/Icon';
import CommentsList from './CommentsList';

interface Props {
  idx: number;
  user: string;
  handleAddComments: ({ text, rootComment }: { text: string; rootComment?: string }) => void;
  handleUpdateComments: ({ commentId, emoji }) => void;
  handleDeleteComments: ({ commentId, rootComment }) => void;
  rootComment?: string;
}

const CommentItem = (props: Props & IComment) => {
  const {
    text,
    idx,
    dataCreated,
    emojis,
    user,
    id,
    reply,
    userId,
    handleUpdateComments,
    handleDeleteComments,
    handleAddComments,
    rootComment,
  } = props;
  const { isOff: replyFormOff, handleToggle } = useToggle();

  return (
    <article className="flex flex-col gap-1">
      <section className="flex justify-between text-xs">
        <h3 className="text-deepGreen">{`#${idx}`}</h3>
        <div className="flex">
          <span className="text-gray">{formatUnixTime(dataCreated.seconds)}</span>
          {userId === user && (
            <ButtonIcon
              iconName="close"
              svgStyles="w-4 h-4 stroke-gray"
              buttonStyles="p-0 pl-2"
              handleClick={() => handleDeleteComments({ commentId: id, rootComment })}
            />
          )}
        </div>
      </section>
      <section className="mb-2 overflow-hidden">
        <p className="pb-1 pl-1 text-sm">{text}</p>
        <div className="flex items-center justify-between">
          {reply ? (
            <ButtonIcon
              iconName="cornerDownRight"
              svgStyles="w-3 h-3 stroke-gray"
              text={`답글 ${reply?.length}`}
              buttonStyles="flex items-center gap-1 text-gray"
              handleClick={() => handleToggle()}
            />
          ) : (
            <div />
          )}
          <CommentEmojis
            {...emojis}
            onUpdateComments={(emoji: string) => handleUpdateComments({ commentId: id, emoji })}
          />
        </div>
      </section>

      {!replyFormOff && (
        <section className="mb-2 pl-4">
          <CommentsList
            comments={reply as IComment[]}
            userId={userId}
            rootComment={id}
            handleAddComments={handleAddComments}
            handleDeleteComments={handleDeleteComments}
            handleUpdateComments={handleUpdateComments}
          />
        </section>
      )}
    </article>
  );
};

export default CommentItem;
