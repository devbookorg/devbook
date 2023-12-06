'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useModal } from '@/hooks/useModal';
import { deleteUser } from '@/firebase/users';
import Button from '../common/Button';
import { useResetRecoilState } from 'recoil';
import { userState } from '@/recoil/user';

interface DeleteUserAndLogoutProps {
  userId: string;
}

export function DeleteUserAndLogout({ userId }: DeleteUserAndLogoutProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const resetState = useResetRecoilState(userState);

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      resetState();
      router.push('/');
    });
  };
  return (
    <section className="my-4 flex gap-4">
      <Button
        btnStyle="btn-state-lg"
        styles="flex-1 border-red text-red hover:bg-red hover:text-white"
        handleClick={() => {
          openModal({
            center: true,
            children: (
              <ConfirmModal
                content="탈퇴하시겠습니까?"
                onSuccess={() => {
                  deleteUser(userId).then(handleSignOut);
                }}
              />
            ),
          });
        }}
      >
        회원탈퇴
      </Button>
      <Button
        btnStyle="btn-state-lg"
        styles="flex-1 border-deepGreen text-deepGreen hover:bg-deepGreen hover:text-white"
        handleClick={handleSignOut}
      >
        로그아웃
      </Button>
    </section>
  );
}
