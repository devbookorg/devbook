import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen min-w-full justify-center bg-bgc">
      <div className="relative flex h-screen w-[36em] min-w-[320px] max-w-[36em] flex-col bg-white shadow-2xl">
        <Header />
        <Content>{children}</Content>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;

interface LabeledType {
  label: string;
  children: React.ReactNode;
}

export const Labeled = ({ label, children }: LabeledType) => {
  return (
    <div className="grid gap-4">
      <label className="text-lg">{label}</label>
      {children}
    </div>
  );
};
