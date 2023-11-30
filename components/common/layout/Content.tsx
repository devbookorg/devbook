interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return <main className="flex-1 p-6">{children}</main>;
};

export default Content;
