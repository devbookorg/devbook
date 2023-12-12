'use client';

interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return <main className="relative flex-1 overflow-y-scroll px-4 py-6">{children}</main>;
};

export default Content;
