'use client';

import React from 'react';
import SunIcon from '@/assets/icons/sun.svg';
import UserIcon from '@/assets/icons/user.svg';
import Button from '../button/Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
interface Props {
  page: string;
}

const Header = ({ page }: Props) => {
  const router = useRouter();
  const { data } = useSession();

  const contents = page === 'main' && (
    <>
      <h1 className="text-2xl font-bold">DevBook</h1>
      <section className="flex items-center gap-4">
        <Button btnStyle="btn-ghost" handleClick={() => {}}>
          <SunIcon className="h-6 w-6 fill-deepGreen" />
        </Button>
        {data !== null ? (
          <Button btnStyle="btn-ghost" handleClick={() => router.push('/user')}>
            <UserIcon className="h-7 w-7 fill-deepGreen" />
          </Button>
        ) : (
          <Button handleClick={signIn} btnStyle="btn-primary">
            로그인
          </Button>
        )}
      </section>
    </>
  );
  return (
    <header className="flex items-center justify-between px-6 py-4 text-deepGreen">
      {contents}
    </header>
  );
};

export default Header;
