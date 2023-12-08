type ButtonSize = 'sm' | 'lg';
type ButtonType = 'ghost' | 'fill' | 'line';
type ButtonColor = 'gray' | 'deepGreen' | 'red';

type CheckType<T> = T extends 'ghost' ? `${Exclude<ButtonType, 'ghost'>}-${ButtonColor}` : 'ghost';

export type ButtonStyle = `${ButtonSize}-${CheckType<ButtonType>}`;
