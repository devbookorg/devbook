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
    <section className="flex w-full  max-w-[24em] flex-col items-center rounded-lg bg-white p-6">
      <h2>{content}</h2>
      <div className="mt-4 flex w-fit gap-4 ">
        <Button
          btnStyle="lg-line-red"
          handleClick={() => {
            onCancel?.();
            closeModal();
          }}
        >
          {cancelMessage}
        </Button>
        <Button
          btnStyle="lg-line-deepGreen"
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
