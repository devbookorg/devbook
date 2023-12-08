import React from 'react';
import Button from '../Button';

interface Props {
  isOff: boolean;
  handleToggle: () => void;
}

const HamburgerButton = (props: Props) => {
  const { isOff, handleToggle } = props;

  return (
    <Button btnStyle="sm-ghost" styles="z-50" handleClick={() => handleToggle()}>
      <div className="flex flex-col items-center justify-center  ">
        <span
          className={`block h-0.5 w-6 rounded-sm bg-deepGreen 
transition-all duration-300 ease-out ${!isOff ? 'translate-y-1 rotate-45' : '-translate-y-1'}`}
        />
        <span
          className={`my-0.5 block h-0.5 w-6 rounded-sm 
bg-deepGreen transition-all duration-300 ease-out ${!isOff ? 'opacity-0' : 'opacity-100'}`}
        />
        <span
          className={`block h-0.5 w-6 rounded-sm bg-deepGreen 
transition-all duration-300 ease-out ${!isOff ? '-translate-y-1 -rotate-45 ' : 'translate-y-1'}`}
        />
      </div>
    </Button>
  );
};

export default HamburgerButton;
