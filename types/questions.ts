import { Timestamp } from 'firebase/firestore';

export default interface IQuestion {
  id: string;
  category: IQuestionCategory[];
  title: string;
  lowercaseTitle: string;
  answer: string;
  userId: string;
  likes: number;
  message: string;
  approved: 0 | 1 | 2;
  dataCreated: Timestamp;
  tags?: string[];
}

export type IQuestionCategory = 'JS' | 'TS' | 'HTML' | 'CSS' | 'REACT' | 'NEXT' | 'CS';

export interface getQuestionType {
  approved?: 0 | 1;
  sortByLikes?: 'asc' | 'desc';
  category?: string;
  userId?: string;
  page?: number;
  noLimit?: boolean;
  searchKeyword?: string;
}
