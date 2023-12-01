import Layout from '@/components/common/layout/Layout';
import User from '@/components/user/User';
import React from 'react';

const UserPage = () => {
  return (
    <Layout page="user">
      <User />
    </Layout>
  );
};

export default UserPage;
