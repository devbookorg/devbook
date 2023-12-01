'use client';

import User from '@/components/user/User';
import { getFilteredQuestions } from '@/firebase/questions';
import { userStateQuery } from '@/recoil/user';
import IQuestion from '@/types/questions';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const UserPage = () => {
  const user = useRecoilValue(userStateQuery);
  const [userData, setUserData] = useState<IQuestion[]>([]);
  // const [likesData, setLikesData] = useState<IQuestion[]>([]);

  useEffect(() => {
    getFilteredQuestions({ userId: user?.id }).then((res) => setUserData(res));
  }, []);
  // user페이지 올때마다 getFilteredQuestions실행/

  if (!user) {
    return <h1>?</h1>;
  }

  return <User name={user.name} userPost={userData} id={user.id} />;
};

export default UserPage;
