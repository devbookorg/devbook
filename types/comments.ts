import { Timestamp } from 'firebase/firestore';

export default interface IComment {
  id: string;
  text: string;
  questionId: string;
  userId: string;
  reply?: IComment['id'][] | IComment[];
  emojis: {
    thumbsUp: string[];
    thumbsDown: string[];
    alien: string[];
    blueHeart: string[];
    clap: string[];
    eyes: string[];
  };
  dataCreated: Timestamp;
  rootComment?: IComment['id'];
}
