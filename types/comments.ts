import { Timestamp } from 'firebase/firestore';

export default interface IComment {
  id: string;
  text: string;
  questionId: string;
  userId: string;
  reply?: string;
  emojis: {
    thumbsUp: number;
    thumbsDown: number;
    alien: number;
    blueHeart: number;
    clap: number;
    eyes: number;
  };
  dataCreated: Timestamp;
}
