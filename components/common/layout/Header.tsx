'use client';

import React from 'react';
import SunIcon from '@/assets/icons/sun.svg';
import Button from '../button/Button';
import { signIn } from 'next-auth/react';
interface Props {
  page: string;
}

const Header = ({ page }: Props) => {
  const contents = page === 'main' && (
    <>
      <h1 className="text-2xl font-bold">DevBook</h1>
      <section className="flex items-center gap-4">
        <Button handleClick={() => {}}>
          <SunIcon className="h-6 w-6 fill-deepGreen" />
        </Button>
        <Button handleClick={signIn} styles="btn-primary">
          로그인
        </Button>
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
