import { Timestamp, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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
        emojis: [],
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
      query(commentsCollection, where('questionId', '==', questionId))
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
