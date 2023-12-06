import { modalState } from '@/recoil/modal';
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };
  const openModal = ({
    children,
    center,
    closeBtnNone,
  }: {
    children?: React.ReactNode;
    center?: boolean;
    closeBtnNone?: boolean;
  }) => {
    setModalData({ content: children, isOpen: true, center, closeBtnNone });
  };

  return { modalData, closeModal, openModal };
};
