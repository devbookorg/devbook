import { getUser } from '@/firebase/users';
import { atom, selector } from 'recoil';

export const userMailState = atom<string>({
  key: 'userMailState',
  default: '',
});

export const userStateQuery = selector({
  key: 'userInfoState',
  get: async ({ get }) => {
    const response = await getUser({ email: get(userMailState) });
    return response;
  },
});
