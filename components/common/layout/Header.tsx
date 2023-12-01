'use client';

import React from 'react';
import Button from '../button/Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';
interface Props {
  page: string;
}

const Header = ({ page }: Props) => {
  const router = useRouter();
  const { data } = useSession();

  let contents = <></>;
  switch (page) {
    case 'main':
      contents = (
        <>
          <h1 className="text-2xl font-bold">DevBook</h1>
          <section className="flex items-center gap-4">
            <Button btnStyle="btn-ghost" handleClick={() => {}}>
              <Icon name="sun" className="h-8 w-8 fill-deepGreen" />
            </Button>
            {data !== null ? (
              <Button btnStyle="btn-ghost" handleClick={() => router.push('/user')}>
                <Icon name="user" className="h-8 w-8 fill-deepGreen" />
              </Button>
            ) : (
              <Button handleClick={signIn} btnStyle="btn-primary">
                로그인
              </Button>
            )}
          </section>
        </>
      );
      break;
    case 'user':
      contents = (
        <>
          <Button btnStyle="btn-ghost" handleClick={() => router.push('/')}>
            <Icon name="arrowLeft" className="h-8 w-8  stroke-deepGreen" />
          </Button>
          <Button btnStyle="btn-ghost" handleClick={() => {}}>
            <Icon name="bell" className="h-8 w-8 stroke-deepGreen" />
          </Button>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 text-deepGreen">
      {contents}
    </header>
  );
};

export default Header;
