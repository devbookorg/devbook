import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface Props {
  page: string;
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const { page, children } = props;
  return (
    <div className="flex min-h-screen min-w-full justify-center bg-green/30 ">
      <div className=" flex h-screen w-[36em] min-w-[320px] max-w-[36em] flex-col bg-white shadow-2xl">
        <Header page={page} />
        <Content>{children}</Content>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
