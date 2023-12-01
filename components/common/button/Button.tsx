interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  btnStyle:
    | 'btn-primary'
    | 'btn-ghost'
    | 'btn-fill'
    | 'btn-JS'
    | 'btn-TS'
    | 'btn-HTML'
    | 'btn-CSS'
    | 'btn-REACT'
    | 'btn-NEXT'
    | 'btn-CS';
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, handleClick, btnStyle, type }: Props) => {
  return (
    <button type={type ?? 'button'} className={btnStyle} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
