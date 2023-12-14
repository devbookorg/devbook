import IComment from '@/types/comments';
import Comment from './CommentItem';
import CommentForm from './CommentForm';
import { useState } from 'react';
import { addComment, updateCommentReply } from '@/firebase/comments';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';

interface Props {
  comments: IComment[];
  userId: string;
  questionId: string;
  commentId?: string;
}

const Comments = (props: Props) => {
  const { comments, userId, questionId, commentId } = props;
  const [updateComments, setUpdateComments] = useState<IComment[]>(comments);

  const makeNewComment = (text: string): IComment => {
    return {
      id: uuidv4(),
      text,
      userId,
      questionId,
      dataCreated: Timestamp.now(),
      emojis: { thumbsDown: [], thumbsUp: [], eyes: [], blueHeart: [], clap: [], alien: [] },
    };
  };

  const handleAddComments = (text: string) => {
    const newComment = makeNewComment(text);
    if (commentId) {
      updateCommentReply({
        newComment,
        user: userId,
        currentComment: commentId,
      });
    } else {
      addComment({ newComment, user: userId });
    }
    setUpdateComments((prev) => [...prev, newComment]);
  };

  return (
    <section className="flex flex-col gap-4">
      <CommentForm handleAddComments={handleAddComments} />
      {!updateComments || !updateComments.length ? (
        <div className="text-center text-sm text-gray">등록된 댓글이 없습니다. </div>
      ) : (
        <ul className=" flex flex-col gap-2">
          {updateComments.map((comment, idx) => (
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
