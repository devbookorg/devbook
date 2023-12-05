import { atom } from 'recoil';

export type ModalType = {
  isOpen: boolean;
  content: React.ReactNode | React.JSX.Element;
  center?: boolean;
  callBack?: () => void;
};

export const modalState = atom<ModalType>({
  key: 'modalState',
  default: {
    isOpen: false,
    content: null,
    center: false,
  },
});
