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
} from 'firebase/firestore';

interface IUser {
  id: string;
  name: string;
  email: string;
  likeQuestions: string[];
}

const usersCollection = collection(db, 'users');

// 1. 유저를 db에 추가하는 함수
export const addUser = async (userData: { name: string; email: string }) => {
  const id = uuidv4();
  try {
    const userQuery = await getDocs(query(usersCollection, where('email', '==', userData.email)));

    if (userQuery.empty) {
      addDoc(usersCollection, {
        ...userData,
        id,
        likeQuestions: [],
      });
    }
  } catch (error) {
    console.error('Failed to add User:', error);
    throw error;
  }
};

// 2. 유저정보를 불러오는 함수
// export const getUser = async (userData: { id: string; email: string }): Promise<IUser | null> => {
export const getUser = async (userData: { email: string }): Promise<IUser | null> => {
  try {
    const userQuery = await getDocs(
      // query(usersCollection, where('id', '==', userData.id), where('email', '==', userData.email))
      query(usersCollection, where('email', '==', userData.email))
    );

    if (userQuery.empty) {
      return null;
    } else {
      const user = userQuery.docs[0].data() as IUser;
      console.log('user : ', user);
      return user;
    }
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
};

// 3. 유저의 데이터 중 likeQuestions 값을 수정하는 업데이트 함수
export const updateUserLikeQuestions = async (
  userId: string,
  likeQuestions: string[]
): Promise<IUser | null> => {
  try {
    const userRef = doc(usersCollection, userId); // 수정된 부분
    await updateDoc(userRef, { likeQuestions });

    const updatedUserSnapshot = await getDoc(userRef);
    const updatedUser = updatedUserSnapshot.data() as IUser;
    return updatedUser;
  } catch (error) {
    console.error('Failed to update user likeQuestions:', error);
    throw error;
  }
};

// 4. 유저를 db에서 삭제하는 함수
export const deleteUser = async (userId: string): Promise<IUser | null> => {
  try {
    const userRef = doc(usersCollection, userId);
    const deletedUserSnapshot = await getDoc(userRef);

    if (deletedUserSnapshot.exists()) {
      const deletedUserData = deletedUserSnapshot.data() as IUser;
      await deleteDoc(userRef);
      return deletedUserData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};
