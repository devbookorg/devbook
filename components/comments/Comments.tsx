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
  const { comments, handleAddComments, handleUpdateComments } = useComments({
    ...props,
    prevComments: props.comments,
  });

  return (
    <section
      className={`flex flex-col gap-4 ${
        props.commentId ? 'rounded-md bg-deepGreen/20 p-2' : 'bg-white'
      }`}
    >
      <CommentForm handleAddComments={handleAddComments} />
      {!comments || !comments.length ? (
        <div className="text-center text-sm text-gray">등록된 댓글이 없습니다. </div>
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
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Comments;
