import { addComment, updateCommentReply } from '@/firebase/comments';
import IComment from '@/types/comments';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const makeNewComment = (data: { text: string; userId: string; questionId: string }): IComment => {
  const { text, userId, questionId } = data;
  return {
    id: uuidv4(),
    text,
    userId,
    questionId,
    dataCreated: Timestamp.now(),
    emojis: { thumbsDown: [], thumbsUp: [], eyes: [], blueHeart: [], clap: [], alien: [] },
  };
};

export const useComments = ({
  prevComments,
  userId,
  questionId,
  commentId,
}: {
  prevComments: IComment[];
  userId: string;
  questionId: string;
  commentId?: string;
}) => {
  const [comments, setComments] = useState<IComment[]>(prevComments || []);

  const handleAddComments = (text: string) => {
    const newComment = makeNewComment({ text, userId, questionId });
    const updatedComment = commentId ? newComment : { ...newComment, reply: [] };
    if (commentId) {
      updateCommentReply({
        newComment: updatedComment,
        user: userId,
        currentComment: commentId,
      });
    } else {
      addComment({ newComment: updatedComment, user: userId });
    }
    setComments((prev) => [...prev, updatedComment]);
  };

  const handleUpdateComments = () => {};

  return { comments, handleAddComments, handleUpdateComments };
};
