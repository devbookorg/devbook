import {
  addComment,
  deleteComment,
  updateCommentEmojis,
  updateCommentReply,
} from '@/firebase/comments';
import IComment from '@/types/comments';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setComments(prevComments);
  }, [prevComments?.length]);

  const handleAddComments = (text: string) => {
    const newComment = makeNewComment({ text, userId, questionId });
    const updatedComment = commentId
      ? { ...newComment, rootComment: commentId }
      : { ...newComment, reply: [], rootComment: null };
    if (commentId) {
      updateCommentReply({
        rootComment: commentId,
        commentId: updatedComment.id,
      });
      addComment({ newComment: updatedComment, user: userId });
    } else {
      addComment({ newComment: updatedComment, user: userId });
    }
    setComments((prev) => [...prev, updatedComment]);
  };

  const handleUpdateComments = ({
    commentId,
    emoji,
  }: {
    commentId: string;
    emoji: string;
    rootComment?: string;
  }) => {
    updateCommentEmojis({ commentId, emoji, userId });
    const alreadyCheck = (currentComment: IComment) =>
      currentComment.emojis[emoji].includes(userId);
    const updateEmoji = (comment: IComment) => ({
      ...comment.emojis,
      [emoji]: alreadyCheck(comment)
        ? [...comment.emojis[emoji]].filter((user) => user !== userId)
        : [...comment.emojis[emoji], userId],
    });

    setComments((prev) =>
      prev.map((cmt) => ({ ...cmt, emojis: cmt.id === commentId ? updateEmoji(cmt) : cmt.emojis }))
    );
  };

  const handleDeleteComments = ({
    commentId,
    rootComment,
  }: {
    commentId: string;
    rootComment?: string;
  }) => {
    deleteComment(commentId);
    updateCommentReply({ rootComment, commentId });
    setComments((prev) => prev.filter((e) => e.id !== commentId));
  };

  return { comments, handleAddComments, handleUpdateComments, handleDeleteComments };
};
