import { Form } from 'react-bootstrap';

export interface VideoInputProps {
  bilibili: string;
  youtube: string;
  onBilibiliChange: (subject: string) => void;
  onYoutubeChange: (subject: string) => void;
}

export const VideoInputInput: React.FC<VideoInputProps> = ({
  bilibili,
  youtube,
  onBilibiliChange,
  onYoutubeChange,
}: VideoInputProps) => {
  const handleBilibiliChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBilibiliChange(e.target.value);
  };

  const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onYoutubeChange(e.target.value);
  };

  return (
    <div className="mt-3">
      <label className="font-bold">Video url:</label>
      <Form.Control
        type="url"
        maxLength={200}
        value={bilibili}
        onChange={handleBilibiliChange}
        placeholder="bilibili url"
      />
      <Form.Control
        type="url"
        className="mt-2"
        maxLength={200}
        value={youtube}
        onChange={handleYoutubeChange}
        placeholder="youtube url"
      />
    </div>
  );
};
