'use client';

import { userStateQuery } from '@/recoil/user/atoms';
import { useRecoilValue } from 'recoil';

import QuestionsList from './QuestionsList';
import Button from '../common/button/Button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/firebase/users';

const User = () => {
  const user = useRecoilValue(userStateQuery);
  const router = useRouter();

  if (!user) return <></>;

  const { name, id } = user;

  return (
    <article className="flex flex-col gap-6 ">
      <section className="flex items-center gap-2">
        <b className="text-lg">{name}</b>님
      </section>
      <QuestionsList />
      <section className="my-4 flex  gap-4">
        <Button
          btnStyle="btn-state-lg"
          styles="flex-1 border-gray text-gray hover:border-red hover:text-red"
          handleClick={() => {}}
        >
          탈퇴
        </Button>
        <Button
          btnStyle="btn-state-lg"
          styles="flex-1 border-deepGreen text-deepGreen"
          handleClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push('/');
            });
          }}
        >
          로그아웃
        </Button>
      </section>
    </article>
  );
};

export default User;
