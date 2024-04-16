import { Form } from 'react-bootstrap';

export interface SubjectInputProps {
  subject: string;
  onChange: (subject: string) => void;
}

export const SubjectInput: React.FC<SubjectInputProps> = ({
  subject,
  onChange,
}: SubjectInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mt-3">
      <Form.Control
        type="text"
        maxLength={50}
        value={subject}
        onChange={handleChange}
        placeholder="填写标题"
      />
    </div>
  );
};
