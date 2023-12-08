import React from 'react';
import Button from '../Button';
import Icon from '../Icon';
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
    <div className="absolute bottom-0 right-0 z-40 flex h-full w-full max-w-[36em] flex-col items-start gap-2 bg-white p-6 pt-20 ">
      {data !== null ? (
        <>
          {user?.admin && (
            <Button
              styles="hover:text-green"
              btnStyle="lg-ghost"
              handleClick={() => {
                handleClose();
                router.push('/admin');
              }}
            >
              관리페이지
            </Button>
          )}
          <Button
            btnStyle="lg-ghost"
            styles="flex items-center gap-3"
            handleClick={() => {
              router.push('/write');
              handleClose();
            }}
          >
            <Icon name="pen" className="h-8 w-8 fill-deepGreen" />
            작성하기
          </Button>
          <Button
            btnStyle="lg-ghost"
            styles="flex items-center gap-3"
            handleClick={() => {
              router.push('/user');
              handleClose();
            }}
          >
            <Icon name="user" className="h-8 w-8 fill-deepGreen" />
            나의 정보
          </Button>
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
    </div>
  );
};

export default Nav;
