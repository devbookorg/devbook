'use client';

import { userStateQuery } from '@/recoil/user/atoms';
import { useRecoilValue } from 'recoil';

import QuestionsList from './QuestionsList';

const User = () => {
  const user = useRecoilValue(userStateQuery);

  if (!user) return <></>;

  const { name } = user;

  return (
    <article className="flex flex-col gap-6 ">
      <section className="flex items-center gap-2">
        <b className="text-lg">{name}</b>님
      </section>
      <QuestionsList />
    </article>
  );
};

export default User;
