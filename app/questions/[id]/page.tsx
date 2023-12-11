'use client';

import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import LikeQuestionPart from '@/components/common/LikeQuestionPart';
import { userState } from '@/recoil/user';
import React from 'react';
import { useRecoilValue } from 'recoil';

const Page = () => {
  const { id: userId } = useRecoilValue(userState);

  return (
    <article className=" flex h-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-5 py-4">
        {userId === data.userId && (
          <section className="flex flex-col justify-center gap-1">
            <div className="flex items-center gap-1.5">
              <Icon
                name="alert"
                className={`h-5 w-5 ${data.approved === 0 ? 'stroke-deepGreen' : 'stroke-red'}`}
              />
              {data.approved !== 1 && (
                <span className="text-sm">{data.approved === 0 ? '대기' : '거부'}</span>
              )}
            </div>
            <p className="mb-2 text-xs text-gray">관리자의 승인후에 게시됩니다.</p>
            <hr className="w-full border-lightGray" />
          </section>
        )}
        <section>
          <ul className="flex gap-2">
            {data.category.map((e) => (
              <li key={e} className="mt-1">
                <Badge value={e} size="lg" />
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-3">
          <h1 className="items-end px-1 text-lg">
            <span className="font-bold text-deepGreen">Q. </span>
            {data.title}
          </h1>
          <p className="break-all px-3 text-gray">{data.answer}</p>
        </section>
      </div>
      <div className="flex flex-col gap-6 py-4">
        <section className="flex items-center justify-between px-1">
          <span className="text-right text-xs text-gray">{data.dataCreated}</span>
          <LikeQuestionPart {...data} />
        </section>
        <hr className="border-lightGray" />
        {userId === data.userId && (
          <section className="flex gap-4">
            <Button btnStyle="lg-line-red" styles="flex-1">
              삭제
            </Button>
            <Button btnStyle="lg-line-deepGreen" styles="flex-1">
              수정
            </Button>
          </section>
        )}
      </div>
    </article>
  );
};

export default Page;
