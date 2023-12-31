import { db } from '.';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  DocumentData,
  DocumentReference,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import IUser, { NotificationMessage } from '@/types/users';

const usersCollection = collection(db, 'users');
const questionsCollection = collection(db, 'questions');

// 1. 유저를 db에 추가하는 함수
export const addUser = async (userData: { userId: string; name: string }) => {
  const id = uuidv4();
  try {
    const userQuery = await getDocs(query(usersCollection, where('userId', '==', userData.userId)));

    if (userQuery.empty) {
      addDoc(usersCollection, {
        ...userData,
        id,
        userId: userData.userId,
        likeQuestions: [],
        notificationMessages: [],
      });
    }
  } catch (error) {
    console.error('Failed to add User:', error);
    throw error;
  }
};

// 2. 유저정보를 불러오는 함수
// export const getUser = async (userData: { id: string; email: string }): Promise<IUser | null> => {
export const getUser = async (userData: { id: string }): Promise<IUser | null> => {
  try {
    const userQuery = await getDocs(query(usersCollection, where('userId', '==', userData.id)));

    if (userQuery.empty) {
      return null;
    } else {
      const user = userQuery.docs[0].data() as IUser;
      return user;
    }
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
};

// 3. 유저의 데이터 중 likeQuestions 값을 수정하는 업데이트 함수
export const updateUserLikeQuestions = async (userId: string, questionId: string) => {
  try {
    const usersQuery = await getDocs(query(usersCollection, where('id', '==', userId)));
    const firstUserDocumentId = usersQuery.docs[0].id;
    const UserRef = doc(usersCollection, firstUserDocumentId);
    const userSnapshot = await getDoc(UserRef);

    const questionsQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));
    const firstQuestionDocumentId = questionsQuery.docs[0].id;
    const QuestionRef = doc(usersCollection, firstQuestionDocumentId);
    const questionSnapshot = await getDoc(QuestionRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as IUser;
      let updatedLikeQuestions: string[];

      // 이미 해당 questionId가 likeQuestions 배열에 존재하는지 확인
      const questionIndex = userData.likeQuestions.indexOf(questionId);

      if (questionIndex !== -1) {
        // 이미 존재하는 경우, 해당 questionId를 배열에서 제거
        updatedLikeQuestions = [
          ...userData.likeQuestions.slice(0, questionIndex),
          ...userData.likeQuestions.slice(questionIndex + 1),
        ];
      } else {
        // 존재하지 않는 경우, 해당 questionId를 배열에 추가
        updatedLikeQuestions = [...userData.likeQuestions, questionId];
      }

      // 업데이트된 likeQuestions를 사용하여 유저 데이터 업데이트
      await updateDoc(UserRef, { likeQuestions: updatedLikeQuestions });
    }
  } catch (error) {
    console.error('Failed to update user likeQuestions:', error);
    throw error;
  }
};

// 4. 유저를 db에서 삭제하는 함수
export const deleteUser = async (userId: string) => {
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', userId)));

    if (!userQuery.empty) {
      const firstDocumentId = userQuery.docs[0].id;

      const userRef = doc(usersCollection, firstDocumentId);
      const deletedUserSnapshot = await getDoc(userRef);

      if (deletedUserSnapshot.exists()) {
        await deleteDoc(userRef);
      }
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

// user데이터에 notificationMessage값을 업데이트하는 로직
export const updateUserNotificationMessage = async (body: {
  userId: string;
  notificationMessage: NotificationMessage;
}) => {
  const { userId, notificationMessage } = body;
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', userId)));
    const firstUserDocumentId = userQuery.docs[0].id;

    const userRef = doc(usersCollection, firstUserDocumentId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as IUser;

      const updateNotificationMessages: NotificationMessage[] = [
        ...userData.notificationMessages,
        { ...notificationMessage, updatedDate: Timestamp.now() },
      ];
      await updateDoc(userRef, {
        notification: true,
        notificationMessages: updateNotificationMessages,
      });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
