import { useModal } from '@/hooks/useModal';
import React from 'react';
import Button from './Button';
import Icon from '../common/Icon';

const Modal = () => {
  const { modalData, closeModal } = useModal();
  return (
    <>
      {modalData.isOpen && (
        <div className="absolute h-screen w-full bg-black/70 ">
          <div
            className={`absolute flex h-full w-full ${
              modalData.center ? 'items-center' : 'items-end'
            } justify-center `}
          >
            <div
              className={`relative w-screen max-w-fit  overflow-hidden bg-white ${
                modalData.center ? 'rounded-lg p-6' : 'rounded-t-lg'
              }`}
            >
              <Button
                btnStyle="btn-ghost"
                handleClick={closeModal}
                styles="absolute top-2 right-2  z-10"
              >
                <Icon name="close" className="h-8 w-8" />
              </Button>
              {modalData.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
