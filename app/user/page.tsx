'use client';

import User from '@/components/user/User';
import { getFilteredQuestions } from '@/firebase/questions';
import { userState } from '@/recoil/user';
import IQuestion from '@/types/questions';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const UserPage = () => {
  const user = useRecoilValue(userState);
  const [userData, setUserData] = useState<IQuestion[]>([]);
  // const [likesData, setLikesData] = useState<IQuestion[]>([]);

  useEffect(() => {
    console.log(user);
    getFilteredQuestions({ userId: user?.id }).then((res) => setUserData(res));
  }, []);

  if (!user) {
    return <h1>?</h1>;
  }

  return <User name={user.name} userPost={userData} id={user.id} />;
};

export default UserPage;
