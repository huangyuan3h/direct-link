import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import styles from './messsageArea.module.scss';
import MessageForm from './MessageForm';
import Share from '../Share';

interface MessageAreaProps {
  subject: string;
  topics: string[];
  images: string[];
  email: string;
}

export const MessageArea: React.FC<MessageAreaProps> = ({
  subject,
  topics,
  images,
  email,
}) => {
  const initialized = useComponentInitialized();

  if (!initialized) {
    return <></>;
  }

  return (
    <div className={styles.MessageArea}>
      <div className={styles.MessageContent}>
        <Share
          isMobile={false}
          subject={subject}
          topics={topics}
          images={images}
        />
        <MessageForm authEmail={email} />
      </div>
    </div>
  );
};
