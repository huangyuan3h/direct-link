import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import styles from './messsageArea.module.scss';
import MessageForm from './MessageForm';

interface MessageAreaProps {
  authEmail: string;
}

export const MessageArea: React.FC<MessageAreaProps> = ({ authEmail }) => {
  const initialized = useComponentInitialized();

  if (!initialized) {
    return <></>;
  }

  return (
    <div className={styles.MessageArea}>
      <div className={styles.MessageContent}>
        <MessageForm authEmail={authEmail} />
      </div>
    </div>
  );
};
