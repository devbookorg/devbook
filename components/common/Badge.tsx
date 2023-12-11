import React from 'react';

interface Props {
  value: string;
  size?: 'sm' | 'lg';
}

const Badge = (props: Props) => {
  const { value, size } = props;
  const bg = {
    JS: 'bg-yellow',
    TS: 'bg-sky',
    HTML: 'bg-orange',
    CSS: 'bg-blue',
    REACT: 'bg-sky',
    NEXT: 'bg-black',
    CS: 'bg-deepGreen',
  };

  const textColor = value === 'JS' ? 'text-black' : 'text-white';

  if (size === 'lg') {
    return (
      <div
        className={`w-fit rounded-xl px-2 py-1 text-xs leading-tight ${bg[value]} ${textColor} border border-black bg-opacity-90 hover:bg-opacity-100`}
      >
        {value}
      </div>
    );
  }

  return (
    <div
      className={`w-fit rounded-md px-1.5 py-0.5 text-xs leading-tight ${bg[value]} ${textColor} bg-opacity-90 hover:bg-opacity-100`}
    >
      {value}
    </div>
  );
};

export default Badge;
