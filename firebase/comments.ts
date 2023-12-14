import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '.';
import IComment from '@/types/comments';

const usersCollection = collection(db, 'users');
const commentsCollection = collection(db, 'comments');

// 1. add comment
export const addComment = async (body: { text: string; userId: string; questionId: string }) => {
  const id = uuidv4();
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', body.userId)));

    if (userQuery.empty) {
      alert('로그인을 해주세요');
      return null;
    } else {
      const { text, userId, questionId } = body;
      const comment = {
        id,
        text,
        userId,
        questionId,
        emojis: { thumbsUp: [], thumbsDown: [], alien: [], clap: [], eyes: [], blueHeart: [] },
        reply: [],
        dataCreated: Timestamp.now(),
      };
      addDoc(commentsCollection, comment);
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
        const alreadyChecks = comment.data().emojis[emoji].includes(userId);

        if (alreadyChecks) {
          const emojiData = comment.data().emojis[emoji].filter((e: string) => e !== userId);
          await updateDoc(commentRef, { emojis: { ...comment.data().emojis, [emoji]: emojiData } });
        } else {
          const emojiData = [...comment.data().emojis[emoji], userId];
          await updateDoc(commentRef, { emojis: { ...comment.data().emojis, [emoji]: emojiData } });
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateCommentReply = async (body: {
  commentId: string;
  text: string;
  userId: string;
  questionId: string;
}) => {
  try {
    const { commentId, userId, text, questionId } = body;
    const userQuery = await getDocs(query(usersCollection, where('id', '==', userId)));
    if (userQuery.empty) {
      alert('로그인을 해주세요');
      return null;
    }
    const commentQuery = await getDocs(query(commentsCollection, where('id', '==', commentId)));
    if (!commentQuery.empty) {
      const [commentDoc] = commentQuery.docs;
      const commentRef = doc(commentsCollection, commentDoc.id);
      const comment = await getDoc(commentRef);
      const id = uuidv4();
      const newComment = {
        id,
        text,
        userId,
        questionId,
        emojis: { thumbsUp: [], thumbsDown: [], alien: [], clap: [], eyes: [], blueHeart: [] },
        dataCreated: Timestamp.now(),
      };

      await updateDoc(commentRef, { reply: [...comment.data().reply, newComment] });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
