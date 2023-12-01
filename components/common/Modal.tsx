import { useModal } from '@/hooks/useModal';
import React from 'react';

const Modal = () => {
  const { modalData } = useModal();
  return (
    <>
      {modalData.isOpen && (
        <div className="absolute h-screen w-full bg-black/70 ">
          <div className="absolute flex h-full w-full items-end justify-center">
            {modalData.content}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
