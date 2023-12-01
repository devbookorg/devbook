import { getUser } from '@/firebase/users';
import { userState } from '@/recoil/user/atoms';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const Main = () => {
  const { data } = useSession();
  const setUserState = useSetRecoilState(userState);
  useEffect(() => {
    if (data) {
      const user = getUser({ email: data.user!.email! });
      setUserState(user);
    }
  }, [data]);

  return <div>Main</div>;
};

export default Main;
