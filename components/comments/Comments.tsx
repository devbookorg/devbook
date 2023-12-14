import IComment from '@/types/comments';
import Comment from './CommentItem';
import CommentForm from './CommentForm';

interface Props {
  comments: IComment[];
  userId: string;
  questionId: string;
}

const Comments = (props: Props) => {
  const { comments, userId, questionId } = props;

  return (
    <section className="flex flex-col gap-4">
      <CommentForm userId={userId} questionId={questionId} />
      {!comments || !comments.length ? (
        <div className="text-center text-sm text-gray">등록된 댓글이 없습니다. </div>
      ) : (
        <ul className=" flex flex-col gap-2">
          {comments.map((comment, idx) => (
            <li key={comment.id}>
              <Comment {...comment} idx={idx} user={userId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Comments;
