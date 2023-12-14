import IComment from '@/types/comments';
import Comment from './CommentItem';
import CommentForm from './CommentForm';
import { useComments } from '@/hooks/useComments';

interface Props {
  comments: IComment[];
  userId: string;
  questionId: string;
  commentId?: string;
}

const Comments = (props: Props) => {
  const { comments, handleAddComments, handleUpdateComments, handleDeleteComments } = useComments({
    ...props,
    prevComments: props.comments,
  });

  return (
    <section
      className={`flex flex-col gap-4 ${
        props.commentId ? 'rounded-md border border-deepGreen/40 bg-deepGreen/20 p-2' : 'bg-white'
      }`}
    >
      <CommentForm handleAddComments={handleAddComments} />
      {!comments || !comments.length ? (
        <>
          {!props.commentId && (
            <div className="py-4 text-center text-sm text-gray">등록된 댓글이 없습니다. </div>
          )}
        </>
      ) : (
        <ul className=" flex flex-col gap-2">
          {comments.map((comment, idx) => (
            <li key={comment.id}>
              <Comment
                {...comment}
                idx={idx}
                user={props.userId}
                handleUpdateComments={({ commentId, emoji }) =>
                  handleUpdateComments({ commentId, emoji, rootComment: props.commentId })
                }
                handleDeleteComments={(commentId) => {
                  handleDeleteComments({ commentId, rootComment: props.commentId });
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Comments;
