import IQuestion from '@/types/questions';
import React, { useCallback } from 'react';
import Button from '../common/Button';
import Icon, { ButtonIcon } from '../common/Icon';
import { useModal } from '@/hooks/useModal';
import { deleteQuestion } from '@/firebase/questions';
import ConfirmModal from '../common/ConfirmModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  user: string;
  loadWroteQuestions: () => void;
}

const QuestionItem = (props: Props & IQuestion) => {
  const { id, user, userId, title, answer, message, category, approved, loadWroteQuestions } =
    props;
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <section className="flex translate-y-[6px] flex-col items-end justify-between">
      <div className="flex items-center">
        {approved === 1 ? (
          <Icon name="checkCircle" />
        ) : approved === 2 ? (
          <Icon name="xCircle" />
        ) : (
          <></>
        )}

        {approved !== 1 && userId === user && (
          <>
            <ButtonIcon
              iconName="edit"
              svgStyles="h-5 w-5  fill-deepGreen"
              handleClick={() => {
                router.push(
                  `/write?${createQueryString(
                    'writeProps',
                    JSON.stringify({ questionId: id, category, title, answer })
                  )}`
                );
              }}
            />
          </>
        )}
        <ButtonIcon
          iconName="trash"
          svgStyles="h-5 w-5 fill-red"
          handleClick={() => {
            openModal({
              center: true,
              children: (
                <ConfirmModal
                  content="삭제하시겠습니까?"
                  onSuccess={() => {
                    deleteQuestion(id).then(loadWroteQuestions);
                  }}
                />
              ),
            });
          }}
        />
      </div>
    </section>
  );
};

export default QuestionItem;
