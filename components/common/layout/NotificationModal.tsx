import { userState } from '@/recoil/user';
import { NotificationMessage } from '@/types/users';
import formatUnixTime from '@/utils/functions/formatUnixTime';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface Props {
  closeModal: () => void;
}

const NotificationItem = (props: NotificationMessage & Props) => {
  const { approved, approvedDate, questionTitle, rejectionMessage, closeModal } = props;
  const isApproved = approved === 1 ? '승인' : '거부';
  return (
    <>
      <li className="py-2">
        <Link href="/user" onClick={closeModal}>
          <div className="flex flex-col gap-0.5">
            <h3
              className={`text-xs font-bold ${
                isApproved === '승인' ? 'text-deepGreen' : 'text-red'
              }`}
            >
              {isApproved}
            </h3>
            <p className="px-1 text-sm text-black">
              <span className="text-deepGreen">&#39;{questionTitle}&#39; </span>
              문제가 {isApproved}
              되었습니다.
            </p>
            {/* {rejectionMessage && (
              <p className="px-1 text-xs text-gray">사유 : {rejectionMessage}</p>
            )} */}
            <span className="text-right text-xs text-gray">
              {formatUnixTime(approvedDate.seconds)}
            </span>
          </div>
        </Link>
      </li>
      <hr className="border-lightGray" />
    </>
  );
};

const Notification = (props: Props) => {
  const { closeModal } = props;
  const { notificationMessages } = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState);
  useEffect(() => {
    setUserState((prev) => ({ ...prev, notification: false }));
  }, []);
  return (
    <section className="absolute right-0 top-0 z-[40] flex h-full w-full max-w-[36em] flex-col items-start gap-2 bg-white p-4 pt-16">
      <ul className="top-0 h-full w-full overflow-scroll">
        {[...notificationMessages].reverse().map((e, i) => (
          <NotificationItem key={e.approvedDate.toString() + i} {...e} closeModal={closeModal} />
        ))}
      </ul>
    </section>
  );
};

export default Notification;
