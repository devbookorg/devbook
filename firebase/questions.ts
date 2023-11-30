import { db, storage } from ".";
import {
  Query,
  getDoc,
  deleteDoc,
  addDoc,
  collection,
  doc,
  DocumentData,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where,
  FirestoreDataConverter as FirestoreDataConverterType,
} from "firebase/firestore";

interface IQuestion {
  id: string;
  category?: string;
  title: string;
  answer: string;
  userId: string;
  likes: number;
  message: string;
  approved: 0 | 1 | 2;
  dataCreated: Date;
}
// interface IQuestion extends IQuestion {
//   id: string;
// }
interface FirestoreDataConverter<T> {
  toFirestore(modelObject: T): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T;
}

const questionsCollection = collection(db, "questions");

// 1. question을 생성하는 로직
export const createQuestion = async (body: {
  category: string;
  title: string;
  answer: string;
  userId: string;
}): Promise<IQuestion> => {
  try {
    const { category, title, answer, userId } = body;
    const newQuestionRef = await addDoc(questionsCollection, {
      category,
      title,
      answer,
      userId,
      likes: 0,
      approved: 0,
      dataCreated: new Date(),
    });
    const newQuestionSnapshot = await getDoc(newQuestionRef);
    const newQuestion: IQuestion = newQuestionSnapshot.data() as IQuestion;
    return newQuestion;
  } catch (error) {
    console.error("Failed to create a new question:", error);
    throw error;
  }
};

// 2. question의 title, answer를 수정하는 로직
export const updateQuestion = async (
  questionId: string,
  body: { title?: string; answer?: string }
): Promise<IQuestion | null> => {
  try {
    const questionRef = doc(questionsCollection, questionId);
    const updatedData: Record<string, any> = {};

    if (body.title) updatedData.title = body.title;
    if (body.answer) updatedData.answer = body.answer;

    await updateDoc(questionRef, updatedData);

    const updatedQuestionSnapshot = await getDoc(questionRef);
    const updatedQuestion: IQuestion =
      updatedQuestionSnapshot.data() as IQuestion;
    return updatedQuestion;
  } catch (error) {
    console.error("Failed to update question:", error);
    throw error;
  }
};

// 3. question의 likes를 수정하는 로직
export const updateQuestionLikes = async (
  questionId: string,
  body: { likes: number }
): Promise<IQuestion | null> => {
  try {
    const questionRef = doc(questionsCollection, questionId);
    await updateDoc(questionRef, { likes: body.likes });

    const updatedQuestionSnapshot = await getDoc(questionRef);
    const updatedQuestion: IQuestion =
      updatedQuestionSnapshot.data() as IQuestion;
    return updatedQuestion;
  } catch (error) {
    console.error("Failed to update question likes:", error);
    throw error;
  }
};

// 4. question의 approved를 수정하는 로직
export const updateQuestionApproved = async (
  questionId: string,
  body: { approved: number }
): Promise<IQuestion | null> => {
  try {
    const questionRef = doc(questionsCollection, questionId);
    await updateDoc(questionRef, { approved: body.approved });

    const updatedQuestionSnapshot = await getDoc(questionRef);
    const updatedQuestion: IQuestion =
      updatedQuestionSnapshot.data() as IQuestion;
    return updatedQuestion;
  } catch (error) {
    console.error("Failed to update question approved status:", error);
    throw error;
  }
};

// 5. question을 삭제하는 로직
export const deleteQuestion = async (
  questionId: string
): Promise<IQuestion | null> => {
  try {
    const questionRef = doc(questionsCollection, questionId);
    const deletedQuestionSnapshot = await getDoc(questionRef);
    const deletedQuestion: IQuestion =
      deletedQuestionSnapshot.data() as IQuestion;

    await deleteDoc(questionRef);
    return deletedQuestion;
  } catch (error) {
    console.error("Failed to delete question:", error);
    throw error;
  }
};

// Converter for Firestore Data
const questionConverter: FirestoreDataConverter<IQuestion> = {
  toFirestore: (question: IQuestion) => question,
  fromFirestore: (snapshot: QueryDocumentSnapshot<IQuestion>) => {
    const data = snapshot.data();
    const id = snapshot.id;
    return { ...data, id };
  },
};

// 6. question을 불러오는 필터링이 가능한 로직
export const getFilteredQuestions = async (filters: {
  sortByLikes?: "asc" | "desc";
  sortByDate?: "asc" | "desc";
  category?: string;
  userId?: string;
}): Promise<IQuestion[]> => {
  try {
    const { sortByLikes, sortByDate, category, userId } = filters;
    let filteredQuery = query(questionsCollection, orderBy("dataCreated"));

    if (category)
      filteredQuery = query(filteredQuery, where("category", "==", category));
    if (userId)
      filteredQuery = query(filteredQuery, where("userId", "==", userId));

    if (sortByLikes)
      filteredQuery = query(filteredQuery, orderBy("likes", sortByLikes));
    if (sortByDate)
      filteredQuery = query(filteredQuery, orderBy("dataCreated", sortByDate));

    const questionsSnapshot = await getDocs(filteredQuery);
    const questions = questionsSnapshot.docs.map(
      (doc) => doc.data() as IQuestion
    ); // 타입 어설션 추가
    return questions;
  } catch (error) {
    console.error("Failed to get filtered questions:", error);
    throw error;
  }
};

// 7. questions의 모든 데이터의 갯수를 가져오는 로직
export const getQuestionsCount = async (): Promise<number> => {
  try {
    const questionsSnapshot = await getDocs(questionsCollection);
    const count: number = questionsSnapshot.size;
    return count;
  } catch (error) {
    console.error("Failed to get question count:", error);
    throw error;
  }
};
