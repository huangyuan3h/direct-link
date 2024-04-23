import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Badge } from 'react-bootstrap';

export interface CategoriesProps {
  categories: string[];
  onChange: (c: string[]) => void;
}

const MAX_CATEOGRY = 5;

export const Categories: React.FC<CategoriesProps> = ({
  categories,
  onChange,
}: CategoriesProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDownPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      handleAddButtonClick();
    }
  };

  const handleAddButtonClick = () => {
    const toAddVal = inputValue.trim();

    setInputValue('');
    if (
      categories.includes(toAddVal) ||
      categories.length === MAX_CATEOGRY ||
      toAddVal.length === 0
    ) {
      return;
    }

    onChange([...categories, inputValue.trim()]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = categories.filter((tag) => tag !== tagToRemove);
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
          maxLength={50}
        />
        <Button variant="outline-secondary" onClick={handleAddButtonClick}>
          添加
        </Button>
      </InputGroup>
      <div className="text-muted  mt-1">
        <small>添加话题来提高曝光度，话题不能重复，最多添加5个话题</small>
      </div>
      <div className="flex gap-x-2 gap-y-1 flex-wrap mt-2">
        {categories.map((c) => (
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
      {categories.length !== 0 && (
        <div className="text-muted mt-1">
          <small>点击话题标签移除</small>
        </div>
      )}
    </div>
  );
};
