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
  approved: 1 | 2;
  approvedDate?: Timestamp;
  questionTitle: string;
  rejectMessage?: string;
}
