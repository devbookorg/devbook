import { atom } from 'recoil';

interface User {
  id: string;
  name: string;
  email: string;
  likeQuestions: string[];
}

export const userState = atom<User>({
  key: 'userState',
  default: { id: '', email: '', name: '', likeQuestions: [] },
});
