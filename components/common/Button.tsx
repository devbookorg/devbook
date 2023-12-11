import { ButtonStyle } from '@/types/buttons';

interface Props {
  children: React.ReactNode;
  handleClick?: () => void;
  styles?: string;
  btnStyle: ButtonStyle;
  type?: ButtonPropertyType;
  disabled?: boolean;
}
export type ButtonPropertyType = 'button' | 'submit' | 'reset';

export const getbuttonClass = (style: ButtonStyle) => {
  const [buttonSize, type, color] = style.split('-');
  const size = buttonSize === 'sm' ? 'btn-sm' : 'btn-lg';
  switch (type) {
    case 'fill':
      return `${size} ${color === 'red' ? 'bg-red' : 'bg-deepGreen'} text-white`;
    case 'line':
      return `${size} border 
      ${color === 'red' ? 'border-red' : 'border-deepGreen'} 
      ${color === 'red' ? 'text-red' : 'text-deepGreen'} 
      ${color === 'red' ? 'lg:hover:bg-red' : 'lg:hover:bg-deepGreen'} lg:hover:text-white`;
    case 'ghost':
      return `${size}`;
  }
};

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
