import React from 'react';
import Icon from './Icon';
import { useToggle } from '@/hooks/useToggle';

interface Props {
  condition: boolean;
  handleClick: () => void;
}

const Likes = (props: Props) => {
  const { condition, handleClick } = props;
  const { isOff, handleToggle } = useToggle();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick();
        handleToggle();
      }}
      onMouseEnter={() => handleToggle(false)}
      onMouseLeave={() => handleToggle(true)}
    >
      {isOff && condition ? (
        <Icon name="heart" className="h-6 w-6" />
      ) : (
        <Icon name="heartFill" className="h-6 w-6" />
      )}
    </button>
  );
};

export default Likes;
