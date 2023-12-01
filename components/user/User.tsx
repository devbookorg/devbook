'use client';
import { userStateQuery } from '@/recoil/user/atoms';
import { useRecoilValue } from 'recoil';

const User = () => {
  const user = useRecoilValue(userStateQuery);
  const { name } = user;

  return (
    <article className="h-full">
      <section className="flex items-center gap-2">
        <b className="text-lg">{name}</b>님
      </section>
      <section></section>
    </article>
  );
};

export default User;
