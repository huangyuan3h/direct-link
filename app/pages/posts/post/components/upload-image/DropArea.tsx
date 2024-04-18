import { DragType, ImageDragItem } from './dragItem';
import { useDrop } from 'react-dnd';
import styles from './upload-image.module.scss';

interface DropAreaProps {
  index: number;
  children: React.ReactNode;
  onDrop: (item: File, targetIndex: number) => void;
}

export const DropArea: React.FC<DropAreaProps> = ({
  index,
  children,
  onDrop,
}: DropAreaProps) => {
  const handleDrop = (item: ImageDragItem) => {
    onDrop(item.file, index);
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragType.Image,
      drop: handleDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [index]
  );

  return (
    <div ref={drop} className={styles.imageWrapper}>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
      {children}
    </div>
  );
};
