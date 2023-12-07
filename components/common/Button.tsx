interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  styles?: string;
  btnStyle: 'btn-primary' | 'btn-sm' | 'btn-fill' | 'btn-state-lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ children, handleClick, styles, btnStyle, type, disabled }: Props) => {
  return (
    <button
      type={type ?? 'button'}
      className={`${styles || ''} ${btnStyle}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
