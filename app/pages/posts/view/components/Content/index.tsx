import sanitizeHtml from 'sanitize-html';
import './content.css';

export interface ContentProps {
  content: string;
}

export const Content: React.FC<ContentProps> = ({ content }: ContentProps) => {
  const sanitizedHtml = sanitizeHtml(content); // make sure safe html

  return (
    <div
      className="mt-2 np-content"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
