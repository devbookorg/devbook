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
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
  limit,
  FirestoreDataConverter as FirestoreDataConverterType,
  startAfter,
} from 'firebase/firestore';

interface FirestoreDataConverter<T> {
  toFirestore(modelObject: T): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T;
}

const usersCollection = collection(db, 'users');
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
export const updateQuestionApproved = async (body: { questionId: string; approved: number }) => {
  const { questionId, approved } = body;
  try {
    const questionsQuery = await getDocs(query(questionsCollection, where('id', '==', questionId)));
    const firstQuestionDocumentId = questionsQuery.docs[0].id;

    const questionRef = doc(questionsCollection, firstQuestionDocumentId);
    await updateDoc(questionRef, { approved });
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
// 유저의 알람 모두 읽기
export const updateQuestionsNotification = async (userId: string) => {
  try {
    const userQuery = await getDocs(query(usersCollection, where('id', '==', userId)));
    const firstUserDocumentId = userQuery.docs[0].id;

    const userRef = doc(usersCollection, firstUserDocumentId);
    await updateDoc(userRef, { notification: false });
  } catch (error) {
    console.error('Failed to update question messages:', error);
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
    const { sortByLikes, category, userId, approved, page } = filters;
    // let filteredQuery = query(questionsCollection, orderBy('dataCreated'));

    // let filteredQuery = query(questionsCollection, limit(10));
    let filteredQuery = query(questionsCollection);
    // let filteredQuery = query(questionsCollection, orderBy('likes'));

    if (approved !== null && approved !== undefined) {
      filteredQuery = query(filteredQuery, where('approved', 'in', [approved]));
    }

    if (category) filteredQuery = query(filteredQuery, where('category', '==', category));
    if (userId) filteredQuery = query(filteredQuery, where('userId', '==', userId));

    if (sortByLikes) {
      filteredQuery = query(filteredQuery, orderBy('likes', sortByLikes));
    } else {
      filteredQuery = query(filteredQuery, orderBy('dataCreated'));
    }

    // 최대 10개의 문서만 가져옵니다.
    const pageSize = 10;
    filteredQuery = query(filteredQuery, limit(pageSize));
    // startAfter를 사용하여 특정 값(여기서는 13) 이후의 문서를 가져옵니다.

    // 페이지가 1보다 클 때에만 시작점을 계산하여 설정합니다.
    if (page > 1) {
      const startAfterDoc = await getDocs(query(filteredQuery, limit((page - 1) * pageSize))).then(
        (snapshot) => snapshot.docs[snapshot.docs.length - 1]
      );
      if (startAfterDoc) {
        filteredQuery = query(filteredQuery, startAfter(startAfterDoc));
      }
    }

    const questionsSnapshot = await getDocs(filteredQuery);
    // const pageQuestions = questionsSnapshot.docs.slice((page - 1) * 10, page * 10);

    const questions = questionsSnapshot.docs.map((doc) => doc.data() as IQuestion); // 타입 어설션 추가

    return questions;
  } catch (error) {
    console.error('Failed to get filtered questions:', error);
    throw error;
  }
};
// approved가 0=> 1|2  quetions{state:false}

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
export const getLikesQuestions = async (
  questions: string[],
  page = 1
): Promise<{ questions: IQuestion[]; total: number }> => {
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
    return { questions: result.slice((page - 1) * 10, page * 10), total: result.length };
  } catch (error) {
    console.error('Failed to get questions', error);
    throw error;
  }
};
