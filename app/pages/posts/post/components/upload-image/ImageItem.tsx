import styles from './upload-image.module.scss';
import Image from 'next/image';
import { CloseButton } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { DragType, ImageDragItem } from './dragItem';

interface ImageItemProps {
  file: File | string;
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
    if (typeof file === 'string') {
      onDelete(file);
    } else {
      onDelete(file.name);
    }
  };

  const imageSrc = typeof file === 'string' ? file : URL.createObjectURL(file);

  return (
    <div
      key={`display-image-${typeof file === 'string' ? file : file.name}`}
      ref={drag}
      className={styles.imageDragArea}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Image
        src={imageSrc}
        alt={`Image ${typeof file === 'string' ? file : file.name}`}
        width={100}
        height={100}
        className={styles.image}
        loading="lazy"
      />
      <CloseButton onClick={handleDelete} className={styles.closeButton} />
    </div>
  );
};
