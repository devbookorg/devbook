'use client';

import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import HamburgerButton from './HamburgerButton';
import Nav from './Nav';
import { useToggle } from '@/hooks/useToggle';
import Icon from '../Icon';

const Header = () => {
  const router = useRouter();
  const { isOff, handleToggle } = useToggle();

  return (
    <header className="flex items-center justify-between px-6 py-4 text-deepGreen">
      <Button
        btnStyle="btn-ghost"
        styles="p-0 z-50 "
        handleClick={() => {
          router.push('/');
          handleToggle(true);
        }}
      >
        <h1 className="text-xl font-bold hover:text-green">DevBook</h1>
      </Button>
      <section className="flex gap-3">
        <Icon name="sun" className="z-50 h-7 w-7 fill-deepGreen" />
        <HamburgerButton isOff={isOff} handleToggle={handleToggle} />
        {!isOff && <Nav handleClose={() => handleToggle(true)} />}
      </section>
    </header>
  );
};

export default Header;
