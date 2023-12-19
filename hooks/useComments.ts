import {
  addComment,
  deleteComment,
  getComments,
  updateCommentEmojis,
  updateCommentReply,
} from '@/firebase/comments';
import { updateUserNotificationMessage } from '@/firebase/users';
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
  userId,
  questionId,
  questionWriter,
  questionTitle,
}: {
  userId: string;
  questionId: string;
  questionWriter: string;
  questionTitle: string;
}) => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    getComments(questionId).then((res) => setComments(res));
  }, [questionId]);

  const handleAddComments = ({ text, rootComment }: { text: string; rootComment: string }) => {
    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }
    const newComment = makeNewComment({ text, userId, questionId });
    const updatedComment = rootComment
      ? { ...newComment, rootComment }
      : { ...newComment, reply: [], rootComment: null };

    if (rootComment) {
      updateCommentReply({
        rootComment,
        commentId: updatedComment.id,
      });
      addComment({ newComment: updatedComment, user: userId });
      setComments((prev: IComment[]) =>
        prev.map((cmt: IComment) => {
          if (cmt.id === rootComment) {
            return { ...cmt, reply: [...cmt.reply, updatedComment] };
          } else {
            return { ...cmt };
          }
        })
      );
    } else {
      addComment({ newComment: updatedComment, user: userId });
      setComments((prev) => [...prev, updatedComment]);
    }

    updateUserNotificationMessage({
      userId: questionWriter,
      notificationMessage: {
        reason: 'comment',
        questionId,
        questionTitle,
      },
    });
  };

  const handleUpdateComments = ({
    commentId,
    emoji,
    rootComment,
  }: {
    commentId: string;
    emoji: string;
    rootComment?: string;
  }) => {
    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }
    updateCommentEmojis({ commentId, emoji, userId });
    const alreadyCheck = (currentComment: IComment) =>
      currentComment.emojis[emoji].includes(userId);
    const updateEmoji = (comment: IComment) => ({
      ...comment.emojis,
      [emoji]: alreadyCheck(comment)
        ? [...comment.emojis[emoji]].filter((user) => user !== userId)
        : [...comment.emojis[emoji], userId],
    });
    if (rootComment) {
      setComments((prev) =>
        prev.map((cmt) => {
          if (cmt.id === rootComment) {
            return {
              ...cmt,
              reply: cmt.reply.map((re) => ({
                ...re,
                emojis: re.id === commentId ? updateEmoji(re) : re.emojis,
              })),
            };
          } else {
            return { ...cmt };
          }
        })
      );
    } else {
      setComments((prev) =>
        prev.map((cmt) => ({
          ...cmt,
          emojis: cmt.id === commentId ? updateEmoji(cmt) : cmt.emojis,
        }))
      );
    }
  };

  const handleDeleteComments = ({
    commentId,
    rootComment,
  }: {
    commentId: string;
    rootComment?: string;
  }) => {
    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }

    if (rootComment) {
      setComments((prev) =>
        prev.map((cmt) => {
          if (cmt.id === rootComment) {
            return { ...cmt, reply: cmt.reply.filter((re) => re.id !== commentId) };
          } else {
            return { ...cmt };
          }
        })
      );
      updateCommentReply({ rootComment, commentId });
    } else {
      setComments((prev) => prev.filter((d) => d.id !== commentId));
    }
    deleteComment(commentId);
  };

  return { comments, handleAddComments, handleUpdateComments, handleDeleteComments };
};
