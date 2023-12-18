import {
  addComment,
  deleteComment,
  getComments,
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

export const useComments = ({ userId, questionId }: { userId: string; questionId: string }) => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    getComments(questionId).then((res) => setComments(res));
  }, [questionId]);

  const handleAddComments = ({ text, rootComment }: { text: string; rootComment: string }) => {
    const newComment = makeNewComment({ text, userId, questionId });
    // console.log(rootComment);
    // console.log(newComment.id);
    console.log({ ...newComment, rootComment }, '안될때 11');
    console.log({ ...newComment, reply: [], rootComment: null }, '될때 222 ');
    const updatedComment = rootComment
      ? { ...newComment, rootComment }
      : { ...newComment, reply: [], rootComment: null };

    console.log(rootComment);
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
      console.log(comments);
    } else {
      console.log({ newComment: updatedComment, user: userId }, '<<<<');
      addComment({ newComment: updatedComment, user: userId });
      setComments((prev) => [...prev, updatedComment]);
    }
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
    console.log(rootComment);
    deleteComment({ commentId });
    updateCommentReply({ rootComment, commentId });

    const a = [1, 2, 3, 4, 5];

    const b = a.filter((e) => e === 2);
    console.log(comments, 'comments');
    console.log(
      comments.filter((comment) => {
        return comment.id !== commentId;
      })
    );
    // console.log(comments);
    // console.log(comments);
    // console.log(comments);

    // const result = comments.filter((e) => {
    //   if (rootComment) {

    //   } else {
    //     return e.id !== commentId;
    //   }
    // });
    // console.log(result, 'result');
    // return result;

    // setComments(result);

    // setComments((prev) => {
    //   const result = prev.filter((e) => {
    //     if (rootComment) {
    //       // return e.reply.filter((d) => console.log(d.id, 'd.id'));
    //       // return e.reply.filter((d) => d.id !== commentId);
    //       return e.reply[0];
    //     } else {
    //       return e.id !== commentId;
    //     }
    //   }

    //   );
    //   console.log(result, 'result');
    //   return result;
    // });
  };

  return { comments, handleAddComments, handleUpdateComments, handleDeleteComments };
};
