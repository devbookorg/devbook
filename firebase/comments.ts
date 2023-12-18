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
  console.log(data, '1. add comment');
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', data.user)));

    if (userQuery.empty) {
      alert('로그인을 해주세요');
      return null;
    } else {
      await addDoc(commentsCollection, data.newComment);
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
      query(
        commentsCollection,
        where('questionId', '==', questionId),
        where('rootComment', '==', null),
        orderBy('dataCreated')
      )
    );

    if (commentsQuery.empty) {
      return [];
    } else {
      const replyQueries = await Promise.all(
        commentsQuery.docs.map(async (q) => {
          const data = q.data();
          const replies = await Promise.all(
            data.reply.map(async (re: string) => {
              const snapShot = await getDocs(query(commentsCollection, where('id', '==', re)));
              const [comment] = snapShot.docs.map((c) => c.data() as IComment);
              return comment;
            })
          );
          return {
            ...data,
            reply: replies,
          };
        })
      );
      return replyQueries as IComment[];
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
}) => {
  try {
    const { commentId, userId, emoji } = body;
    const commentQuery = await getDocs(query(commentsCollection, where('id', '==', commentId)));
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
        await updateDoc(commentRef, { emojis: updateEmoji(comment.data() as IComment) });
      }
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// 4. update Reply
export const updateCommentReply = async ({
  rootComment,
  commentId,
}: {
  rootComment: string;
  commentId: string;
}) => {
  try {
    const commentQuery = await getDocs(query(commentsCollection, where('id', '==', rootComment)));
    if (!commentQuery.empty) {
      const [commentDoc] = commentQuery.docs;
      const commentRef = doc(commentsCollection, commentDoc.id);
      const comment = await getDoc(commentRef);
      const check = comment.data().reply.includes(commentId);
      const updateData = check
        ? comment.data().reply.filter((cmt: string) => cmt !== commentId)
        : [...comment.data().reply, commentId];
      await updateDoc(commentRef, { reply: updateData });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// 5. delete comment
export const deleteComment = async ({ commentId }) => {
  try {
    const commentQuery = await getDocs(query(commentsCollection, where('id', '==', commentId)));
    if (!commentQuery.empty) {
      const [commentDoc] = commentQuery.docs;
      const commentRef = doc(commentsCollection, commentDoc.id);
      const comment = await getDoc(commentRef);
      if (comment.exists()) {
        await deleteDoc(commentRef);
      }
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
