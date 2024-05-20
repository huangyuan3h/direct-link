import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Badge } from 'react-bootstrap';

export interface TopicsProps {
  topics: string[];
  onChange: (c: string[]) => void;
}

const MAX_TOPICS = 5;
const INPUT_MAX_LENGTH = 50;

export const Topics: React.FC<TopicsProps> = ({
  topics,
  onChange,
}: TopicsProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
  };

  const handleKeyDownPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue !== '') {
      event.preventDefault();
      handleAddButtonClick();
    }
  };

  const handleAddButtonClick = () => {
    if (
      topics.includes(inputValue) ||
      topics.length === MAX_TOPICS ||
      inputValue.length === 0
    ) {
      return;
    }

    onChange([...topics, inputValue]);
    setInputValue('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = topics.filter((tag) => tag !== tagToRemove);
    onChange(updatedTags);
  };

  return (
    <div className="mt-3">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="添加话题"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDownPress}
          maxLength={INPUT_MAX_LENGTH}
        />
        <Button variant="outline-secondary" onClick={handleAddButtonClick}>
          添加
        </Button>
      </InputGroup>
      <div className="text-muted  mt-1">
        <small>添加话题来提高曝光度，话题不能重复，最多添加5个话题</small>
      </div>
      <div className="flex gap-x-2 gap-y-1 flex-wrap mt-2">
        {topics.map((c) => (
          <Badge
            pill
            bg="secondary"
            key={`badge-${c}`}
            onClick={() => handleRemoveTag(c)}
            className="cursor-pointer"
          >
            {c}
          </Badge>
        ))}
      </div>
      {topics.length !== 0 && (
        <div className="text-muted mt-1">
          <small>点击话题标签移除</small>
        </div>
      )}
    </div>
  );
};
