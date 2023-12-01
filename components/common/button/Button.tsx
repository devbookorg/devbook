interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  styles?: string;
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

const Button = ({ children, styles, handleClick, btnStyle, type }: Props) => {
  return (
    <button type={type ?? 'button'} className={`${styles ?? ''} ${btnStyle}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
