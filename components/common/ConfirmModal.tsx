import React from 'react';
import Button from './Button';
import { useModal } from '@/hooks/useModal';

interface Props {
  content: string | React.ReactNode;
  cancelMessage?: string;
  successMessage?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const ConfirmModal = (props: Props) => {
  const { content, cancelMessage = '취소', successMessage = '확인', onCancel, onSuccess } = props;
  const { closeModal } = useModal();

  return (
    <section className="flex w-1/2 min-w-[16em] max-w-[24em] flex-col items-center rounded-lg bg-white p-6">
      <h2>{content}</h2>
      <div className="mt-4 flex w-full gap-4 ">
        <Button
          btnStyle="btn-state-lg"
          styles="text-red border-red flex-1 hover:bg-red hover:text-white"
          handleClick={() => {
            onCancel?.();
            closeModal();
          }}
        >
          {cancelMessage}
        </Button>
        <Button
          btnStyle="btn-state-lg"
          styles="text-deepGreen border-deepGreen flex-1 hover:bg-deepGreen hover:text-white"
          handleClick={() => {
            onSuccess?.();
            closeModal();
          }}
        >
          {successMessage}
        </Button>
      </div>
    </section>
  );
};

export default ConfirmModal;
