import { Timestamp } from 'firebase/firestore';

export default interface IQuestion {
  id: string;
  category: 'JS' | 'TS' | 'HTML' | 'CSS' | 'REACT' | 'NEXT' | 'CS';
  title: string;
  answer: string;
  userId: string;
  likes: number;
  message: string;
  approved: 0 | 1 | 2;
  dataCreated: Timestamp;
}

export interface getQuestionType {
  approved?: 0 | 1;
  sortByLikes?: 'asc' | 'desc';
  category?: string;
  userId?: string;
}
