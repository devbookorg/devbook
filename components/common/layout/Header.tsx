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
import { useSession } from 'next-auth/react';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isOff, handleToggle } = useToggle();
  const { isDarkMode, handleDarkMode } = useDarkMode();
  const { notification } = useRecoilValue(userState);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleNotificationModal = (open?: boolean) => {
    setModalOpen((prev) => open ?? !prev);
  };

  return (
    <header
      className={`flex h-[65px] items-center justify-between px-2 py-2 text-deepGreen after:absolute after:left-0 after:top-[65px] after:z-50 after:w-full after:border-b-[1px] after:content-[''] sm:px-6`}
    >
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
            {isDarkMode !== null && (
              <ButtonIcon
                iconName={isDarkMode ? 'moon' : 'sun'}
                buttonStyles="z-50"
                svgStyles="h-6 w-6 stroke-deepGreen"
                handleClick={handleDarkMode}
              />
            )}
            {session && (
              <>
                {notification ? (
                  <ButtonIcon
                    iconName="bellUpdate"
                    buttonStyles="z-50"
                    svgStyles={`h-6 w-6 ${modalOpen && 'fill-deepGreen'} stroke-deepGreen`}
                    handleClick={() => {
                      handleNotificationModal();
                      handleToggle(true);
                    }}
                  />
                ) : (
                  <ButtonIcon
                    iconName="bell"
                    buttonStyles="z-50"
                    svgStyles={`h-6 w-6 ${modalOpen && 'fill-deepGreen'} stroke-deepGreen`}
                    handleClick={() => {
                      handleNotificationModal();
                      handleToggle(true);
                    }}
                  />
                )}
              </>
            )}

            <HamburgerButton
              isOff={isOff}
              handleToggle={() => {
                handleNotificationModal(false);
                handleToggle();
              }}
            />
            <Nav
              close={isOff}
              handleClose={() => {
                handleToggle();
              }}
            />
            {!isOff && (
              <div
                onClick={() => handleToggle()}
                className={`absolute left-[0] top-[65px] z-30 h-screen w-full bg-gray/60`}
              />
            )}
            <Notification close={!modalOpen} closeModal={() => {}} />
          </section>
        </>
      )}
    </header>
  );
};

export default Header;
