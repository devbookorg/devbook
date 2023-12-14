import IComment from '@/types/comments';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import React from 'react';
import CommentEmojis from './CommentEmojis';
import { useToggle } from '@/hooks/useToggle';
import { ButtonIcon } from '../common/Icon';
import Comments from './Comments';

interface Props {
  idx: number;
  user: string;
  handleUpdateComments: ({ commentId, emoji }: { commentId: string; emoji: string }) => void;
  handleDeleteComments: (commentId: string) => void;
}

const Comment = (props: Props & IComment) => {
  const {
    text,
    idx,
    dataCreated,
    emojis,
    user,
    id,
    questionId,
    reply,
    handleUpdateComments,
    handleDeleteComments,
  } = props;
  const { isOff: replyFormOff, handleToggle } = useToggle();
  return (
    <>
      <article className="flex flex-col">
        <section className="flex justify-between text-xs">
          <h3 className="text-deepGreen">{`#${idx}`}</h3>
          <div className="flex">
            <span className="text-gray">{formatUnixTime(dataCreated.seconds)}</span>
            <ButtonIcon
              iconName="close"
              svgStyles="w-4 h-4 stroke-gray"
              buttonStyles="p-0 pl-2"
              handleClick={() => handleDeleteComments(id)}
            />
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
              handleUpdateComments={(emoji: string) =>
                handleUpdateComments({ commentId: id, emoji })
              }
            />
          </div>
        </section>

        {!replyFormOff && (
          <section className="mb-2 pl-4">
            <Comments comments={reply} userId={user} questionId={questionId} commentId={id} />
          </section>
        )}
      </article>
      <hr className="border-lightGray" />
    </>
  );
};

export default Comment;
