import React from 'react';
import Button from '../Button';
import { ButtonIcon } from '../Icon';
import { signIn, useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { links } from '@/utils/variable';

interface Props {
  handleClose: () => void;
  close?: boolean;
}

const Nav = (props: Props) => {
  const { handleClose, close } = props;
  const { data } = useSession();
  const user = useRecoilValue(userState);
  const router = useRouter();

  return (
    <div
      className={`${
        close ? 'translate-x-full' : 'translate-x-1/4'
      } absolute right-0 top-[65px] z-40 flex h-[calc(100vh-65px)] w-full max-w-[36em] flex-col items-start gap-2 bg-white  p-4 pt-[15px] duration-500`}
    >
      {data !== null ? (
        <>
          {user?.admin && (
            <ButtonIcon
              btnStyle="lg-ghost"
              iconName="settings"
              buttonStyles="flex items-center gap-3 text-base hover:text-green"
              svgStyles="h-8 w-8 stroke-deepGreen"
              handleClick={() => {
                handleClose();
                router.push('/admin');
              }}
              text="관리페이지"
            />
          )}
          <ButtonIcon
            btnStyle="lg-ghost"
            iconName="pen"
            buttonStyles="flex items-center gap-3 text-base"
            svgStyles="h-8 w-8 fill-deepGreen"
            handleClick={() => {
              router.push('/write');
              handleClose();
            }}
            text="작성하기"
          />

          <ButtonIcon
            btnStyle="lg-ghost"
            iconName="user"
            buttonStyles="flex items-center gap-3 text-base"
            svgStyles="h-8 w-8 fill-deepGreen"
            handleClick={() => {
              router.push('/user');
              handleClose();
            }}
            text="나의 정보"
          />
        </>
      ) : (
        <div className="flex gap-3">
          <Button
            handleClick={() => {
              signIn('google');
              handleClose();
            }}
            btnStyle="lg-line-deepGreen"
          >
            구글 로그인
          </Button>
          <Button
            handleClick={() => {
              signIn('kakao');
              handleClose();
            }}
            btnStyle="lg-line-deepGreen"
          >
            카카오 로그인
          </Button>
        </div>
      )}
      <div className="absolute bottom-10 flex w-2/3 flex-col gap-1 text-sm">
        <hr className="my-3 " />
        <h3 className="my-1 text-base font-bold">
          <Link href="https://github.com/devbookorg/devbook">&copy; 2024 Project DevBook</Link>
        </h3>
        {links.map(({ name, mail, github, portfolio }) => (
          <div className="flex items-center gap-1.5" key={name}>
            <Link href={portfolio}>{name}</Link>
            <span className="text-xs">|</span>
            <Link href={github}>GitHub</Link>
            <span className="text-xs">|</span>
            <a href={`mailto:${mail}`}>Mail</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
