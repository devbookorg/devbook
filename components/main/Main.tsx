import { userMailState } from '@/recoil/user';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const Main = () => {
  const { data } = useSession();
  const setUserMailState = useSetRecoilState(userMailState);
  useEffect(() => {
    if (data) {
      setUserMailState(data.user!.email!);
    }
  }, [data, setUserMailState]);

  return <div>Main</div>;
};

export default Main;
