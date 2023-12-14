import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '.';
import IComment from '@/types/comments';

const usersCollection = collection(db, 'users');
const commentsCollection = collection(db, 'comments');

// 1. add comment
export const addComment = async (data: { user: string; newComment: IComment }) => {
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', data.user)));

    if (userQuery.empty) {
      alert('로그인을 해주세요');
      return null;
    } else {
      addDoc(commentsCollection, data.newComment);
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// 2. get comment
export const getComments = async (questionId: string): Promise<IComment[]> => {
  try {
    const commentsQuery = await getDocs(
      query(commentsCollection, where('questionId', '==', questionId), orderBy('dataCreated'))
    );

    if (commentsQuery.empty) {
      return null;
    } else {
      const comments = commentsQuery.docs.map((doc) => doc.data() as IComment);
      return comments;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// 3. update emojis
export const updateCommentEmojis = async (body: {
  commentId: string;
  emoji: string;
  userId: string;
  rootComment?: string;
}) => {
  try {
    const { commentId, userId, emoji, rootComment } = body;
    const commentQuery = await getDocs(
      query(commentsCollection, where('id', '==', rootComment || commentId))
    );
    const userQuery = await getDocs(query(usersCollection, where('id', '==', userId)));
    if (userQuery.empty) {
      alert('로그인을 해주세요');
      return null;
    }

    if (!commentQuery.empty) {
      const [commentDoc] = commentQuery.docs;
      const commentRef = doc(commentsCollection, commentDoc.id);
      const comment = await getDoc(commentRef);
      if (comment.exists()) {
        const alreadyCheck = (currentComment: IComment) =>
          currentComment.emojis[emoji].includes(userId);
        const updateEmoji = (comment: IComment) => ({
          ...comment.emojis,
          [emoji]: alreadyCheck(comment)
            ? [...comment.emojis[emoji]].filter((user) => user !== userId)
            : [...comment.emojis[emoji], userId],
        });

        const commentData = comment.data() as IComment;
        const updateData = rootComment
          ? {
              reply: [
                ...commentData.reply.map((cmt: IComment) =>
                  cmt.id === commentId ? { ...cmt, emojis: updateEmoji(cmt) } : { ...cmt }
                ),
              ],
            }
          : { emojis: updateEmoji(commentData) };
        await updateDoc(commentRef, updateData);
      }
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// 4. update Reply
export const updateCommentReply = async (data: {
  newComment: IComment;
  user: string;
  currentComment: string;
}) => {
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', data.user)));
    if (userQuery.empty) {
      alert('로그인을 해주세요');
      return null;
    }

    const commentQuery = await getDocs(
      query(commentsCollection, where('id', '==', data.currentComment))
    );
    if (!commentQuery.empty) {
      const [commentDoc] = commentQuery.docs;
      const commentRef = doc(commentsCollection, commentDoc.id);
      const comment = await getDoc(commentRef);
      await updateDoc(commentRef, { reply: [...comment.data().reply, data.newComment] });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// 5. delete Comment
export const deleteComment = async ({
  commentId,
  rootComment,
}: {
  commentId: string;
  rootComment?: string;
}) => {
  try {
    const commentQuery = await getDocs(
      query(commentsCollection, where('id', '==', rootComment || commentId))
    );
    if (!commentQuery.empty) {
      const [commentDoc] = commentQuery.docs;
      const commentRef = doc(commentsCollection, commentDoc.id);
      const comment = await getDoc(commentRef);
      if (comment.exists()) {
        if (rootComment) {
          await updateDoc(commentRef, {
            reply: [...comment.data().reply.filter((e: IComment) => e.id !== commentId)],
          });
        } else {
          await deleteDoc(commentRef);
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
