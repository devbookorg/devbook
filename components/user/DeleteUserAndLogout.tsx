'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useModal } from '@/hooks/useModal';
import { deleteUser } from '@/firebase/users';
import Button from '../common/Button';

interface DeleteUserAndLogoutProps {
  userId: string;
}

export function DeleteUserAndLogout({ userId }: DeleteUserAndLogoutProps) {
  const router = useRouter();
  const { openModal } = useModal();
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
                  deleteUser(userId).then(() => {
                    signOut({ redirect: false }).then(() => {
                      router.push('/');
                    });
                  });
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
        handleClick={() => {
          signOut({ redirect: false }).then(() => {
            router.push('/');
          });
        }}
      >
        로그아웃
      </Button>
    </section>
  );
}
