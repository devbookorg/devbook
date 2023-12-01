import { modalState } from '@/recoil/modal';
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };
  const openModal = ({ children }: { children?: React.ReactNode }) => {
    setModalData({ content: children, isOpen: true });
  };

  return { modalData, closeModal, openModal };
};
