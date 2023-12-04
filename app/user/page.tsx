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
  const [likesData, setLikesData] = useState<IQuestion[]>([]);

  useEffect(() => {
    getFilteredQuestions({}).then((res) => {
      const users = [];
      const likes = [];

      for (let i = 0; i < res.length; i++) {
        if (res[i].userId === user!.id) {
          users.push(res[i]);
        }
        if (user!.likeQuestions.includes(res[i].id)) {
          likes.push(res[i]);
        }
      }
      setUserData(users);
      setLikesData(likes);
    });
  }, [user]);

  if (!user) {
    return <h1>?</h1>;
  }

  return <User name={user.name} userPost={userData} likesPost={likesData} id={user.id} />;
};

export default UserPage;
