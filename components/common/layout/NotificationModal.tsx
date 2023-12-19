import { userState } from '@/recoil/user';
import { NotificationMessage } from '@/types/users';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface Props {
  closeModal: () => void;
  close?: boolean;
}

const NotificationItem = (props: NotificationMessage & Props) => {
  const { approved, updatedDate, questionTitle, closeModal, rejectionMessage } = props;
  const messageType = approved ? (approved === 1 ? '승인' : '거부') : '댓글';
  return (
    <>
      <li className="py-2">
        <Link href="/user" onClick={closeModal}>
          <div className="flex flex-col gap-0.5">
            <h3
              className={`mb-0.5 text-xs font-bold ${
                approved ? (messageType === '승인' ? 'text-deepGreen' : 'text-red') : 'text-gray'
              }`}
            >
              {messageType}
            </h3>
            <p className="px-1 text-sm text-black">
              <span className="text-deepGreen">&#39;{questionTitle}&#39; </span>
              {approved ? `문제가 ${messageType}되었습니다.` : '문제에 댓글이 달렸습니다.'}
            </p>
            {rejectionMessage && (
              <p className="mt-0.5 truncate px-2 text-xs text-gray"> 사유 : {rejectionMessage}</p>
            )}
            <span className="text-right text-xs text-gray">
              {formatUnixTime(updatedDate.seconds)}
            </span>
          </div>
        </Link>
      </li>
      <hr className="border-lightGray" />
    </>
  );
};

const Notification = (props: Props) => {
  const { closeModal, close } = props;
  const { notificationMessages } = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState);
  useEffect(() => {
    setUserState((prev) => ({ ...prev, notification: false }));
  }, []);
  return (
    <section
      className={`${
        close ? 'translate-y-full' : 'translate-y-0'
      } absolute right-0 top-0 z-[40] flex h-full w-full max-w-[36em] flex-col items-start gap-2 bg-white pt-16 duration-500`}
    >
      <div className="h-full w-full overflow-scroll p-4 lg:p-2">
        <ul className=" h-full w-full ">
          {notificationMessages.length === 0 ? (
            <div className="my-16 flex items-center justify-center">새로운 알림이 없습니다.</div>
          ) : (
            [...notificationMessages]
              .reverse()
              .map((e, i) => (
                <NotificationItem
                  key={e.updatedDate.toString() + i}
                  {...e}
                  closeModal={closeModal}
                />
              ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default Notification;
