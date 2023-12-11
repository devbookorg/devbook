import React from 'react';
import Button from '../Button';
import { ButtonIcon } from '../Icon';
import { signIn, useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { useRouter } from 'next/navigation';

interface Props {
  handleClose: () => void;
}

const Nav = (props: Props) => {
  const { handleClose } = props;
  const { data } = useSession();
  const user = useRecoilValue(userState);
  const router = useRouter();

  return (
    <div className="absolute bottom-0 right-0 z-40 flex h-full w-full max-w-[36em] flex-col items-start gap-2 bg-white p-4 pt-20 ">
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
        <Button
          handleClick={() => {
            signIn();
            handleClose();
          }}
          btnStyle="lg-line-deepGreen"
        >
          로그인
        </Button>
      )}

      <div className="absolute bottom-10 flex w-2/3 flex-col gap-1 text-sm">
        <hr className="my-3 " />
        <h3 className="my-1 text-base font-bold">&copy; 2024 Project DevBook</h3>
        <span>임승환 kingryan9996@gmail.com</span>
        <span>강미정 jagarmj@gmail.com</span>
      </div>
    </div>
  );
};

export default Nav;
