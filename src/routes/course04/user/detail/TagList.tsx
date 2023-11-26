import React, { useRef, useState } from 'react';
import { Input, Space, Tag } from 'antd';
import type { InputRef } from 'antd';

const TagList: React.FC<{
  value?: {
    value: string;
    label: string;
  }[];
  onChange?: (
    value: {
      value: string;
      label: string;
    }[]
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<InputRef | null>(null);
  const [newTags, setNewTags] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { value: `new-${tempsTags.length}`, label: inputValue }];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag
          key={item.value}
          closable
          onClose={() => onChange?.((value || []).concat(newTags)?.filter((tag) => tag.value !== item.value))}
        >
          {item.label}
        </Tag>
      ))}
      <Input
        ref={ref}
        type='text'
        size='small'
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};

export default TagList;
