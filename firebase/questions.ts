import IQuestion, { getQuestionType } from '@/types/questions';
import { db, storage } from '.';
import { v4 as uuidv4 } from 'uuid';
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
} from 'firebase/firestore';

interface FirestoreDataConverter<T> {
  toFirestore(modelObject: T): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T;
}

const questionsCollection = collection(db, 'questions');

// 1. question을 생성하는 로직
export const createQuestion = async (body: {
  category: string;
  title: string;
  answer: string;
  userId: string;
}) => {
  try {
    const id = uuidv4();
    const { category, title, answer, userId } = body;
    addDoc(questionsCollection, {
      id,
      category,
      title,
      answer,
      userId,
      likes: 0,
      message: '',
      approved: 0,
      dataCreated: new Date(),
    });
  } catch (error) {
    console.error('Failed to create a new question:', error);
    throw error;
  }
};

// 2. question의 title, answer를 수정하는 로직
export const updateQuestion = async (
  questionId: string,
  body: { category: string; title: string; answer: string }
): Promise<IQuestion | null> => {
  try {
    const questionsQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));
    const firstQuestionDocumentId = questionsQuery.docs[0].id;

    const questionRef = doc(questionsCollection, firstQuestionDocumentId);
    const updatedData: Record<string, any> = {
      category: body.category,
      title: body.title,
      answer: body.answer,
    };

    await updateDoc(questionRef, updatedData);

    const updatedQuestionSnapshot = await getDoc(questionRef);
    const updatedQuestion: IQuestion = updatedQuestionSnapshot.data() as IQuestion;
    return updatedQuestion;
  } catch (error) {
    console.error('Failed to update question:', error);
    throw error;
  }
};

// 3. question의 likes를 수정하는 로직
export const updateQuestionLikes = async (questionId: string, increment: number) => {
  try {
    // const questionRef = doc(questionsCollection, questionId);

    const questionQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));

    if (!questionQuery.empty) {
      const firstDocumentId = questionQuery.docs[0].id;
      const QuestionRef = doc(questionsCollection, firstDocumentId);
      const updateQuestionSnapshot = await getDoc(QuestionRef);

      if (updateQuestionSnapshot.exists()) {
        const currentLikes = updateQuestionSnapshot.data().likes || 0;
        const newLikes = currentLikes + increment;

        await updateDoc(QuestionRef, { likes: newLikes });
      }
    }
  } catch (error) {
    console.error('Failed to update question likes:', error);
    throw error;
  }
};

// 4. question의 approved를 수정하는 로직
export const updateQuestionApproved = async (
  questionId: string,
  body: { approved: number }
): Promise<IQuestion | null> => {
  try {
    const questionsQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));
    const firstQuestionDocumentId = questionsQuery.docs[0].id;

    const questionRef = doc(questionsCollection, firstQuestionDocumentId);
    await updateDoc(questionRef, { approved: body.approved });

    const updatedQuestionSnapshot = await getDoc(questionRef);
    const updatedQuestion: IQuestion = updatedQuestionSnapshot.data() as IQuestion;
    return updatedQuestion;
  } catch (error) {
    console.error('Failed to update question approved status:', error);
    throw error;
  }
};

// 4-1. question의 message를 수정하는 로직
export const updateQuestionMessage = async (
  questionId: string,
  body: { message: string }
): Promise<IQuestion | null> => {
  try {
    const questionsQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));
    const firstQuestionDocumentId = questionsQuery.docs[0].id;

    const questionRef = doc(questionsCollection, firstQuestionDocumentId);
    await updateDoc(questionRef, { message: body.message });

    const updatedQuestionSnapshot = await getDoc(questionRef);
    const updatedQuestion: IQuestion = updatedQuestionSnapshot.data() as IQuestion;
    return updatedQuestion;
  } catch (error) {
    console.error('Failed to update question message:', error);
    throw error;
  }
};

// 5. question을 삭제하는 로직
export const deleteQuestion = async (questionId: string) => {
  try {
    const questionsQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));
    const firstQuestionDocumentId = questionsQuery.docs[0].id;

    const questionRef = doc(questionsCollection, firstQuestionDocumentId);
    await deleteDoc(questionRef);
  } catch (error) {
    console.error('Failed to delete question:', error);
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
export const getFilteredQuestions = async (filters: getQuestionType): Promise<IQuestion[]> => {
  try {
    const { sortByLikes, category, userId, approved, page = 1 } = filters;
    // let filteredQuery = query(questionsCollection, orderBy('dataCreated'));
    let filteredQuery = query(questionsCollection);
    // let filteredQuery = query(questionsCollection, orderBy('likes'));

    if (approved !== null && approved !== undefined) {
      filteredQuery = query(filteredQuery, where('approved', 'in', [approved]));
    }

    if (category) filteredQuery = query(filteredQuery, where('category', '==', category));
    if (userId) filteredQuery = query(filteredQuery, where('userId', '==', userId));

    if (sortByLikes) filteredQuery = query(filteredQuery, orderBy('likes', sortByLikes));

    const questionsSnapshot = await getDocs(filteredQuery);
    const pageQuestions = questionsSnapshot.docs.slice(page * 3, (page + 1) * 3);

    const questions = pageQuestions.map((doc) => doc.data() as IQuestion); // 타입 어설션 추가

    return questions;
  } catch (error) {
    console.error('Failed to get filtered questions:', error);
    throw error;
  }
};

// 7. questions의 모든 데이터의 갯수를 가져오는 로직
export const getQuestionsCount = async (filters: getQuestionType): Promise<number> => {
  try {
    const { sortByLikes, category, userId, approved } = filters;
    let filteredQuery = query(questionsCollection);

    if (approved !== null && approved !== undefined) {
      filteredQuery = query(filteredQuery, where('approved', 'in', [approved]));
    }
    if (category) filteredQuery = query(filteredQuery, where('category', '==', category));
    if (userId) filteredQuery = query(filteredQuery, where('userId', '==', userId));

    if (sortByLikes) filteredQuery = query(filteredQuery, orderBy('likes', sortByLikes));

    const questionsSnapshot = await getDocs(filteredQuery);
    const count: number = questionsSnapshot.size;
    return count;
  } catch (error) {
    console.error('Failed to get question count:', error);
    throw error;
  }
};

// 8. likeQuestions[]의 모든 question을 불러오는 로직
export const getLikesQuestions = async (questions: string[]): Promise<IQuestion[]> => {
  try {
    const result: IQuestion[] = [];

    for (const questionId of questions) {
      const q = query(questionsCollection, where('id', '==', questionId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          result.push(data as IQuestion);
        } else {
          console.error(`No document found for questionId: ${questionId}`);
        }
      });
    }
    return result;
  } catch (error) {
    console.error('Failed to get questions', error);
    throw error;
  }
};
