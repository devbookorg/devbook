import React from 'react';

interface Props {
  value: string;
}

const Badge = (props: Props) => {
  const { value } = props;
  const bg = {
    JS: 'bg-yellow text-black',
    TS: 'bg-sky',
    HTML: 'bg-orange',
    CSS: 'bg-blue',
    REACT: 'bg-sky',
    NEXT: 'bg-black',
    CS: 'bg-deepGreen',
  };
  return (
    <div
      className={`w-fit rounded-md px-1.5 py-0.5 text-xs leading-tight text-white ${bg[value]}  bg-opacity-90 hover:bg-opacity-100`}
    >
      {value}
    </div>
  );
};

export default Badge;
