import { Timestamp } from 'firebase/firestore';

export default interface IComment {
  id: string;
  text: string;
  questionId: string;
  userId: string;
  reply?: string;
  emojis: string[];
  dataCreated: Timestamp;
}
