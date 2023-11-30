'use client';

import { useEffect, useState } from 'react';
import Button from './button/Button';
import ChevronUp from '@/assets/icons/chevronUp.svg';
import ChevronDown from '@/assets/icons/chevronDown.svg';

type ArrayWrapper<T> = T extends number | string | boolean ? T[] : never;

interface DropDownBoxType<T> {
  defaultValue: string;
  dropDownList: ArrayWrapper<T>;
  onChange: (value: string) => void;
}
export default function DropDownBox<T>({
  defaultValue,
  dropDownList,
  onChange,
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
        className="input-primary flex cursor-pointer justify-between align-middle"
      >
        {selectedValue}
        <div>
          {dropDownVisible ? (
            <ChevronUp className="stroke-deepGreen" />
          ) : (
            <ChevronDown className="stroke-deepGreen" />
          )}
        </div>
      </div>
      {dropDownVisible && (
        <div
          className={`${'absolute right-0 top-full flex h-fit translate-y-1 flex-row flex-wrap gap-2 bg-white'}  input-primary`}
        >
          {dropDownList.map((item, index) => (
            <Button
              key={`dropDown_${item}_${index}`}
              btnStyle="btn-fill"
              styles="text-base h-8 w-fit leading-5 py-1 px-2 content-center"
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
