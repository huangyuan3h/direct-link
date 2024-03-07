export interface RadioProps {
  value: string | number;
  label: string;
  checked: boolean;
  onChange: (value: string | number) => void;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  label,
  checked,
  onChange,
}: RadioProps) => {
  const handleClick = () => {
    onChange(value);
  };

  const handleOnChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="form-check" onClick={handleClick}>
      <input
        className="form-check-input"
        type="radio"
        checked={checked}
        onChange={handleOnChange}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};
