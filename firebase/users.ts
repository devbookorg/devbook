import { db } from ".";
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
} from "firebase/firestore";

interface IUser {
  id: string;
  email: string;
  likeQuestions: string[];
}

const usersCollection = collection(db, "users");

// 1. 유저를 db에 등록하는 함수
export const createUser = async (userData: {
  id: string;
  email: string;
}): Promise<IUser> => {
  try {
    const userQuery = await getDocs(
      query(usersCollection, where("id", "==", userData.id))
    );

    if (userQuery.empty) {
      const newUserRef = await addDoc(usersCollection, {
        ...userData,
        likeQuestions: [],
      });
      const newUserSnapshot = await getDoc(newUserRef); // 수정된 부분
      const newUser = newUserSnapshot.data() as IUser;
      return newUser;
    } else {
      // 이미 등록된 유저가 있을 경우 해당 유저 정보를 반환
      return userQuery.docs[0].data() as IUser;
    }
  } catch (error) {
    console.error("Failed to create or get user:", error);
    throw error;
  }
};

// 2. 유저정보를 불러오는 함수
export const getUser = async (userData: {
  id: string;
  email: string;
}): Promise<IUser | null> => {
  try {
    const userQuery = await getDocs(
      query(
        usersCollection,
        where("id", "==", userData.id),
        where("email", "==", userData.email)
      )
    );

    if (userQuery.empty) {
      return null;
    } else {
      const user = userQuery.docs[0].data() as IUser;
      return user;
    }
  } catch (error) {
    console.error("Failed to get user:", error);
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
    console.error("Failed to update user likeQuestions:", error);
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
    console.error("Failed to delete user:", error);
    throw error;
  }
};
