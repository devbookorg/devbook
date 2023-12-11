import React from 'react';
import Header from './Header';
import Content from './Content';

interface Props {
  children: React.ReactNode;
}

const AppLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen min-w-full justify-center bg-bgc">
      <div className="relative flex h-screen w-[36em] min-w-[320px] max-w-[36em] flex-col bg-white shadow-2xl">
        <Header />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default AppLayout;

interface LabeledType {
  label: string;
  children: React.ReactNode;
}

export const Labeled = ({ label, children }: LabeledType) => {
  return (
    <div className="grid gap-3">
      <label className="text-sm">{label}</label>
      {children}
    </div>
  );
};
