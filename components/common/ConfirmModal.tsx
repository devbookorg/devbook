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
    <section className="flex w-full min-w-[10em]  max-w-[24em] flex-col items-center rounded-lg bg-white ">
      <h2>{content}</h2>
      <div className="mt-4 flex  w-full gap-4">
        <Button
          btnStyle="lg-line-red"
          styles="w-full"
          handleClick={() => {
            onCancel?.();
            closeModal();
          }}
        >
          {cancelMessage}
        </Button>
        <Button
          btnStyle="lg-line-deepGreen"
          styles="w-full"
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
