'use client';

import React, { useState } from 'react';
import Button from '../Button';
import { useRouter, usePathname } from 'next/navigation';
import HamburgerButton from './HamburgerButton';
import Nav from './Nav';
import { useToggle } from '@/hooks/useToggle';
import { ButtonIcon } from '../Icon';
import { useDarkMode } from '@/hooks/useDarkMode';
import Notification from './NotificationModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOff, handleToggle } = useToggle();
  const { isDarkMode, handleDarkMode } = useDarkMode();
  const { notification } = useRecoilValue(userState);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleNotificationModal = (open?: boolean) => {
    setModalOpen((prev) => open ?? !prev);
  };

  return (
    <header className="flex items-center justify-between border-b-[1px]   px-2 py-2 text-deepGreen sm:px-6">
      {pathname.includes('questions') ? (
        <>
          <ButtonIcon
            iconName="arrowLeft"
            svgStyles="h-6 w-6 stroke-deepGreen"
            buttonStyles="z-50"
            handleClick={() => router.back()}
          />
        </>
      ) : (
        <>
          <Button
            btnStyle="sm-ghost"
            styles="z-50 "
            handleClick={() => {
              if (pathname === '/') {
                history.go(0);
              } else {
                router.push('/');
                handleToggle(true);
                handleNotificationModal(false);
              }
            }}
          >
            <h1 className="text-xl font-bold hover:text-green">DevBook</h1>
          </Button>
          <section className="flex items-center">
            <ButtonIcon
              iconName={isDarkMode ? 'moon' : 'sun'}
              buttonStyles="z-50"
              svgStyles="h-6 w-6 stroke-deepGreen"
              handleClick={handleDarkMode}
            />
            {notification ? (
              <ButtonIcon
                iconName="bellUpdate"
                buttonStyles="z-50"
                svgStyles="h-6 w-6 stroke-deepGreen"
                handleClick={() => handleNotificationModal()}
              />
            ) : (
              <ButtonIcon
                iconName="bell"
                buttonStyles="z-50"
                svgStyles="h-6 w-6 stroke-deepGreen"
                handleClick={() => handleNotificationModal()}
              />
            )}
            <HamburgerButton
              isOff={isOff}
              handleToggle={() => {
                handleNotificationModal(false);
                handleToggle();
              }}
            />
            {!isOff && <Nav handleClose={() => handleToggle(true)} />}
            {modalOpen && <Notification closeModal={() => handleNotificationModal(false)} />}
          </section>
        </>
      )}
    </header>
  );
};

export default Header;
