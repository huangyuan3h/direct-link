import { DropdownButton, Dropdown } from 'react-bootstrap';
import { options } from './options';
import { useState } from 'react';

export interface CategoryProps {
  category: string;
  onChange: (category: string) => void;
}

export const Category: React.FC<CategoryProps> = ({
  category,
  onChange,
}: CategoryProps) => {
  const [displayText, setDisplay] = useState('帖子类型');

  const handleClick = (val: string) => {
    onChange(val);
    const selected = options.find((item) => item.value === val);
    setDisplay(selected?.text ?? '');
  };

  return (
    <div className="mt-3">
      <DropdownButton variant="outline-secondary" title={displayText}>
        {options.map((item) => {
          return (
            <Dropdown.Item
              href="#"
              key={`category-${item.value}`}
              onClick={() => handleClick(item.value)}
            >
              {item.text}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};
