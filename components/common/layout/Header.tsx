'use client';

import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import HamburgerButton from './HamburgerButton';
import Nav from './Nav';
import { useToggle } from '@/hooks/useToggle';
import { ButtonIcon } from '../Icon';
import { useDarkMode } from '@/hooks/useDarkMode';

const Header = () => {
  const router = useRouter();
  const { isOff, handleToggle } = useToggle();
  const { isDarkMode, handleDarkMode } = useDarkMode();

  return (
    <header className="flex items-center justify-between px-6 py-4 text-deepGreen ">
      <Button
        btnStyle="sm-ghost"
        styles="z-50 "
        handleClick={() => {
          router.push('/');
          handleToggle(true);
        }}
      >
        <h1 className="text-xl font-bold hover:text-green">DevBook</h1>
      </Button>
      <section className="flex items-center gap-1">
        <ButtonIcon
          iconName={isDarkMode ? 'moon' : 'sun'}
          buttonStyles="z-50"
          svgStyles="h-7 w-7 stroke-deepGreen dark:stroke-green"
          handleClick={handleDarkMode}
        />
        <ButtonIcon
          iconName="bellUpdate"
          buttonStyles="z-50"
          svgStyles="h-7 w-7 stroke-deepGreen dark:stroke-green"
          handleClick={handleDarkMode}
        />
        <HamburgerButton isOff={isOff} handleToggle={handleToggle} />
        {!isOff && <Nav handleClose={() => handleToggle(true)} />}
      </section>
    </header>
  );
};

export default Header;
