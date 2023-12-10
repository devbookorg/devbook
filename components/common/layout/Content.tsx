interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <main className="relative flex-1 overflow-y-scroll px-4 pb-2 sm:px-6 sm:py-6">{children}</main>
  );
};

export default Content;
