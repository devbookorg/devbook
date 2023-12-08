import { ButtonStyle, getbuttonClass } from '@/types/buttons';

interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  styles?: string;
  btnStyle: ButtonStyle;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ children, handleClick, styles, btnStyle, type, disabled }: Props) => {
  const buttonStyles = `${styles || ''} ${getbuttonClass(btnStyle)}`;
  return (
    <button
      type={type ?? 'button'}
      className={buttonStyles}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
