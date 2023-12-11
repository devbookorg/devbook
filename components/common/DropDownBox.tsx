'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import ChevronUp from '@/assets/icons/chevronUp.svg';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Icon from './Icon';

type ArrayWrapper<T> = T extends number | string | boolean ? T[] : never;

interface DropDownBoxType<T> {
  defaultValue: string;
  dropDownList: ArrayWrapper<T>;
  onChange: (value: string) => void;
  boxStyles?: string;
  dropBoxStyles?: string;
  arrowColor?: string;
}
export default function DropDownBox<T>({
  defaultValue,
  dropDownList,
  onChange,
  boxStyles,
  dropBoxStyles,
  arrowColor,
}: DropDownBoxType<T>) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [dropDownVisible, setDropDownVisible] = useState(false);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  const dropDownToggle = () => {
    setDropDownVisible(!dropDownVisible);
  };
  return (
    <div className="relative">
      <div
        onClick={dropDownToggle}
        className={`input-primary -middle flex min-w-[88px] cursor-pointer justify-between text-sm ${boxStyles}`}
      >
        {selectedValue}
        <div>
          {dropDownVisible ? (
            <Icon name="chevronUp" className={`stroke-${arrowColor ?? 'deepGreen'}`} />
          ) : (
            <Icon name="chevronDown" className={`stroke-${arrowColor ?? 'deepGreen'}`} />
          )}
        </div>
      </div>
      {dropDownVisible && (
        <div
          className={`${'absolute left-0 top-full flex h-fit translate-y-1 flex-row flex-wrap gap-2 bg-white'}  input-primary ${dropBoxStyles}`}
        >
          {dropDownList.map((item, index) => (
            <Button
              key={`dropDown_${item}_${index}`}
              btnStyle="sm-fill-deepGreen"
              styles="text-sm h-8 w-fit leading-5 py-1 px-2 content-center"
              handleClick={() => {
                dropDownToggle();
                // setSelectedValue(item as string);
                onChange(item as string);
              }}
            >
              {item}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
