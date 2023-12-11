import IUser from '@/types/users';
import { atom } from 'recoil';

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    id: '',
    email: '',
    name: '',
    likeQuestions: [],
    notification: false,
    notificationMessages: [],
  },
});
