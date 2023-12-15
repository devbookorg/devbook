import React, { useState } from 'react';
import Button from './Button';
import Icon from './Icon';

interface TagItemProps {
  tag: string;
  onDelete: (tag: string) => void;
}

const TagItem = (props: TagItemProps) => {
  const { tag, onDelete } = props;
  return (
    <li className="whitespace-nowrap text-gray">
      <Button
        btnStyle="sm-ghost"
        handleClick={() => onDelete(tag)}
        styles="flex items-center gap-1"
      >
        {`# ${tag}`}
        <Icon name="close" className="h-3 w-3 stroke-gray" />
      </Button>
    </li>
  );
};

const QuestionTag = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setTags((prev) => (!prev.includes(value) ? [...prev, value] : [...prev]));
      setValue('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="flex gap-2 overflow-x-scroll rounded-lg border border-gray px-1 py-2">
      <ul className="flex items-center ">
        {tags.map((tag) => (
          <TagItem key={tag} tag={tag} onDelete={handleDeleteTag} />
        ))}
      </ul>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleTags}
        placeholder="태그를 입력해주세요"
        className=" py-2 text-sm outline-none disabled:cursor-not-allowed"
        disabled={tags.length >= 5}
      />
    </div>
  );
};

export default QuestionTag;
