import { useModal } from '@/hooks/useModal';
import React from 'react';

const Modal = () => {
  const { modalData } = useModal();
  return (
    <>
      {modalData.isOpen && (
        <div className="absolute h-full w-full bg-black/70 ">
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
            {modalData.content}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
