import { Timestamp } from 'firebase/firestore';

export default interface IUser {
  id: string;
  name: string;
  email: string;
  likeQuestions: string[];
  notification: boolean;
  admin?: boolean;
  notificationMessages: NotificationMessage[];
}

export interface NotificationMessage {
  updatedDate?: Timestamp;
  reason: 'comment' | 'approved';
  approved?: 1 | 2;
  questionId: string;
  questionTitle: string;
  rejectionMessage?: string;
}
