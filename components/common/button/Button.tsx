interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  styles?: string;
}

const Button = (props: Props) => {
  const { children, styles, handleClick } = props;
  return (
    <button type="button" className={styles || 'btn-ghost'} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
