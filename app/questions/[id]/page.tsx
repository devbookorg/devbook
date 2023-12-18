'use client';

import CommentsList from '@/components/comments/CommentsList';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import ConfirmModal from '@/components/common/ConfirmModal';
import Icon from '@/components/common/Icon';
import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import Spinner from '@/components/common/Spinner';
import { deleteQuestion, getQuestion } from '@/firebase/questions';
import { useComments } from '@/hooks/useComments';
import { useCreateQuery } from '@/hooks/useCreateQuery';
import { useModal } from '@/hooks/useModal';
import { userState } from '@/recoil/user';
import IQuestion from '@/types/questions';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import { Timestamp } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const Page = () => {
  const { id: userId } = useRecoilValue(userState);
  const { openModal } = useModal();
  const params = useParams();
  const router = useRouter();
  const { createQueryString } = useCreateQuery();
  const [data, setData] = useState<IQuestion>({
    id: '',
    category: [],
    title: '',
    lowercaseTitle: '',
    answer: '',
    userId: '',
    likes: 0,
    message: '',
    approved: 0,
    dataCreated: Timestamp.now(),
    tags: [],
  });

  useEffect(() => {
    getQuestion(params.id as string).then((res) => setData(res));
  }, [params.id]);

  const { comments, handleAddComments, handleDeleteComments, handleUpdateComments } = useComments({
    questionId: params.id as string,
    userId,
  });

  if (data.id === '') return <Spinner />;

  return (
    <article className="flex h-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        {userId === data.userId && (
          <section className="flex flex-col justify-center gap-1">
            <div className="flex items-center gap-1.5">
              <Icon
                name="alert"
                className={`h-5 w-5 ${data.approved === 2 ? 'stroke-red' : 'stroke-deepGreen'}`}
              />
              {data.approved === 1 ? (
                <span className="text-sm">승인</span>
              ) : (
                <span className="text-sm">{data.approved === 0 ? '대기' : '거부'}</span>
              )}
            </div>
            {data.approved !== 1 && (
              <p className="text-xs text-gray">관리자의 승인후에 게시됩니다.</p>
            )}
            <hr className="mt-2 w-full border-lightGray" />
          </section>
        )}
        <section>
          <ul className="flex gap-2">
            {data.category?.map((e) => (
              <li key={e} className="mt-1">
                <Badge value={e} size="lg" />
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-3 px-1">
          <h1 className="items-end break-all text-lg">
            <span className="font-bold text-deepGreen">Q. </span>
            {data.title}
          </h1>
          <p className="break-all px-2 text-gray">{data.answer}</p>
          {data.approved === 2 && (
            <>
              <hr className="mt-2 w-full border-lightGray" />
              <h1 className="items-end text-lg">
                <span className="font-bold text-red">사유. </span>
              </h1>
              <p className="break-all px-2 text-gray">{data.message}</p>
            </>
          )}
        </section>
      </div>
      <div className="flex flex-col gap-3 py-4">
        {!!data.tags?.length && (
          <ul className="flex flex-wrap justify-end gap-2 break-all px-1 text-xs text-deepGreen ">
            {data.tags?.map((tag) => (
              <li key={tag}>
                <span>{`# ${tag}`}</span>
              </li>
            ))}
          </ul>
        )}
        <section className="flex items-center justify-between px-1">
          <span className="text-right text-xs text-gray">
            {formatUnixTime(data.dataCreated.seconds)}
          </span>
          {data.approved === 1 && <LikeQuestionPart {...data} />}
        </section>
        <hr className="my-3 border-lightGray" />
        {data.approved === 1 && (
          <CommentsList
            comments={comments}
            userId={userId}
            handleAddComments={handleAddComments}
            handleUpdateComments={handleUpdateComments}
            handleDeleteComments={handleDeleteComments}
          />
        )}
        {userId === data.userId && data.approved !== 1 && (
          <section className="flex gap-4">
            <Button
              btnStyle="lg-line-red"
              styles="flex-1"
              handleClick={() => {
                openModal({
                  center: true,
                  children: (
                    <ConfirmModal
                      content="삭제하시겠습니까?"
                      onSuccess={() => {
                        deleteQuestion(data.id).then(() => {
                          router.back();
                        });
                      }}
                    />
                  ),
                });
              }}
            >
              삭제
            </Button>
            <Button
              btnStyle="lg-line-deepGreen"
              styles="flex-1"
              handleClick={() => {
                router.push(`/write?${createQueryString('question', data.id)}`);
              }}
            >
              수정
            </Button>
          </section>
        )}
      </div>
    </article>
  );
};

export default Page;
