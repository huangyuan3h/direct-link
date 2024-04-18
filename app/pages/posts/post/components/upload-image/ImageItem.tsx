import styles from './upload-image.module.scss';
import Image from 'next/image';
import { CloseButton } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { DragType, ImageDragItem } from './dragItem';

interface ImageItemProps {
  file: File;
  index: number;
  onDelete: (index: number) => void;
}

export const ImageItem: React.FC<ImageItemProps> = ({
  file,
  index,
  onDelete,
}: ImageItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragType.Image,
    item: { index, file } as ImageDragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    onDelete(index);
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
        alt={`Image ${index}`}
        width={100}
        height={100}
        className={styles.image}
      />
      <CloseButton onClick={handleDelete} className={styles.closeButton} />
    </div>
  );
};
