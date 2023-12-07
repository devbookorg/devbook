import { useModal } from '@/hooks/useModal';
import React from 'react';
import Button from './Button';
import Icon from '../common/Icon';

const Modal = () => {
  const { modalData, closeModal } = useModal();
  console.log(modalData, 'modalData');
  return (
    <>
      {modalData.isOpen && (
        <div className="absolute z-[100] h-screen w-full bg-black/70">
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
              {!modalData.closeBtnNone && (
                <Button
                  btnStyle="btn-sm"
                  handleClick={closeModal}
                  styles="absolute top-2 right-2  z-[110]"
                >
                  <Icon name="close" className="h-7 w-7" />
                </Button>
              )}
              {modalData.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
