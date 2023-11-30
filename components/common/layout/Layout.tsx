import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen min-w-full justify-center bg-green ">
      <div className=" flex h-screen w-[36em] max-w-[36em] flex-col bg-white shadow-2xl">
        <Header />
        <Content>{children}</Content>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
