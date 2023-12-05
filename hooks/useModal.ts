import { modalState } from '@/recoil/modal';
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };
  const openModal = ({ children, center }: { children?: React.ReactNode; center?: boolean }) => {
    setModalData({ content: children, isOpen: true, center: center });
  };

  return { modalData, closeModal, openModal };
};
