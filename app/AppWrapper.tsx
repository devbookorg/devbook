'use client;';

import { getUser } from '@/firebase/users';
import { userState } from '@/recoil/user';
import { DefaultUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (session && session.user) {
      const { user } = session;
      getUser({ id: user.id }).then((res) => {
        if (!res) return;
        if (
          res?.id === process.env.NEXT_PUBLIC_APP_ADMIN01_ID ||
          res?.id === process.env.NEXT_PUBLIC_APP_ADMIN02_ID
        ) {
          setUser({ ...res, admin: true });
        } else {
          setUser({ ...res, admin: false });
        }
      });
    }
  }, [session]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Wrapper;
