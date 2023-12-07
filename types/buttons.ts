type ButtonSize = 'sm' | 'lg';
type ButtonType = 'ghost' | 'fill' | 'line';
type ButtonColor = 'gray' | 'deepGreen' | 'red';

type CheckType<T> = T extends 'ghost' ? `${Exclude<ButtonType, 'ghost'>}-${ButtonColor}` : 'ghost';

export type ButtonStyle = `${ButtonSize}-${CheckType<ButtonType>}`;

export const getbuttonClass = (style: ButtonStyle) => {
  const [buttonSize, type, color] = style.split('-');
  const size = buttonSize === 'sm' ? 'btn-sm' : 'btn-lg';
  switch (type) {
    case 'fill':
      return `${size} bg-${color} text-white hover:bg-${color}`;
    case 'line':
      return `${size} border border-${color} text-${color} hover:bg-${color} hover:text-white`;
    case 'ghost':
      return `${size} hover:scale-125`;
  }
};
