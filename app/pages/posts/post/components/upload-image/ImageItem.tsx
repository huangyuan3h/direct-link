import styles from './upload-image.module.scss';
import Image from 'next/image';
import { CloseButton } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { DragType, ImageDragItem } from './dragItem';

interface ImageItemProps {
  file: File;
  onDelete: (name: string) => void;
}

export const ImageItem: React.FC<ImageItemProps> = ({
  file,
  onDelete,
}: ImageItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragType.Image,
    item: { file } as ImageDragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    onDelete(file.name);
  };
  return (
    <div
      key={`display-image-${file.name}`}
      ref={drag}
      className={styles.imageDragArea}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Image
        src={URL.createObjectURL(file)}
        alt={`Image ${file.name}`}
        width={100}
        height={100}
        className={styles.image}
      />
      <CloseButton onClick={handleDelete} className={styles.closeButton} />
    </div>
  );
};
