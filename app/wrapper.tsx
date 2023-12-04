'use client;';

import { getUser } from '@/firebase/users';
import { userState } from '@/recoil/user';
import IUser from '@/types/users';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (data && data.user) {
      getUser({ email: data.user.email! }).then((res) => setUser(res as IUser));
    }
  }, [data]);

  return <>{children}</>;
};

export default Wrapper;
