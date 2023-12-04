'use client';

import React from 'react';
import Button from '../Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';

const Header = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = useRecoilValue(userState);
  console.log(user, '<< user');
  return (
    <header className="flex items-center justify-between px-6 py-4 text-deepGreen">
      <Button btnStyle="btn-ghost" styles="p-0" handleClick={() => router.push('/')}>
        <h1 className="text-2xl font-bold">DevBook</h1>
      </Button>
      <section className="flex items-center gap-4">
        <Button btnStyle="btn-ghost" handleClick={() => {}}>
          <Icon name="sun" className="h-8 w-8 fill-deepGreen" />
        </Button>
        {data !== null ? (
          <>
            {/* <Button btnStyle="btn-ghost" handleClick={() => {}}>
              <Icon name="bell" className="h-8 w-8 stroke-deepGreen" />
            </Button> */}
            {user?.admin && (
              <Button
                btnStyle="btn-ghost"
                handleClick={() => {
                  router.push('/admin');
                }}
              >
                관리페이지
              </Button>
            )}
            <Button btnStyle="btn-ghost" handleClick={() => router.push('/write')}>
              <Icon name="pen" className="h-8 w-8 fill-deepGreen" />
            </Button>
            <Button btnStyle="btn-ghost" handleClick={() => router.push('/user')}>
              <Icon name="user" className="h-8 w-8 fill-deepGreen" />
            </Button>
          </>
        ) : (
          <Button handleClick={signIn} btnStyle="btn-primary">
            로그인
          </Button>
        )}
      </section>
    </header>
  );
};

export default Header;
