import IComment from '@/types/comments';

import CommentForm from './CommentForm';
import React from 'react';
import CommentItem from './CommentItem';

interface Props {
  comments: IComment[];
  userId: string;
  handleAddComments: ({ text, rootComment }) => void;
  handleDeleteComments: ({ commentId, rootComment }) => void;
  handleUpdateComments: ({ commentId, emoji, rootComment }) => void;
  rootComment?: string;
}

const CommentsList = (props: Props) => {
  const { comments, handleAddComments, handleDeleteComments, handleUpdateComments, rootComment } =
    props;

  console.log(comments);

  return (
    <section
      className={`flex flex-col gap-4 py-4 ${
        rootComment ? 'rounded-md border border-deepGreen/40 bg-deepGreen/10 p-2' : 'bg-white'
      }`}
    >
      <CommentForm handleAddComments={handleAddComments} rootComment={rootComment} />
      {!comments || !comments.length ? (
        <>
          {!rootComment && (
            <div className="py-3 text-center text-sm text-gray">등록된 댓글이 없습니다. </div>
          )}
        </>
      ) : (
        <ul className="mb-2 flex flex-col gap-2">
          {comments.map((comment, idx) => (
            <React.Fragment key={comment.id}>
              <li key={comment.id}>
                <CommentItem
                  {...comment}
                  idx={idx}
                  user={props.userId}
                  handleAddComments={handleAddComments}
                  handleUpdateComments={({ commentId, emoji }) =>
                    handleUpdateComments({ commentId, emoji, rootComment })
                  }
                  handleDeleteComments={handleDeleteComments}
                  rootComment={rootComment}
                />
              </li>
              {comments.length - 1 !== idx && <hr className="border-lightGray" />}
            </React.Fragment>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentsList;
