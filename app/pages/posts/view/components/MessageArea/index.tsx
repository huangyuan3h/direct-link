import { useComponentInitialized } from '@/utils/hooks/useComponentInitialized';
import styles from './messsageArea.module.scss';
import MessageForm from './MessageForm';

export const MessageArea: React.FC<{}> = () => {
  const initialized = useComponentInitialized();

  if (!initialized) {
    return <></>;
  }

  return (
    <div className={styles.MessageArea}>
      <div className={styles.MessageContent}>
        <MessageForm />
      </div>
    </div>
  );
};
