import sanitizeHtml from 'sanitize-html';
import styles from './content.module.scss';
import clsx from 'clsx';

export interface ContentProps {
  content: string;
}

export const Content: React.FC<ContentProps> = ({ content }: ContentProps) => {
  const sanitizedHtml = sanitizeHtml(content); // make sure safe html

  return (
    <div
      className={clsx(styles.npContent, 'mt-2')}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
