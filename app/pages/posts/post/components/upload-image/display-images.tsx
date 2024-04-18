import styles from './upload-image.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ImageItem } from './ImageItem';
import { DropArea } from './DropArea';

export interface DisplayImagesProps {
  images: File[];
  onChange: (images: File[]) => void;
}

export const DisplayImages: React.FC<DisplayImagesProps> = ({
  images,
  onChange,
}: DisplayImagesProps) => {
  const handleDelete = (index: number) => {
    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    onChange(updatedFiles);
  };

  const handleDrop = (item: File, index: number, targetIndex: number) => {
    if (index == targetIndex) {
      return;
    }
    const targetItem = images[targetIndex];

    const replaceTargetItem = images.toSpliced(targetIndex, 1, item);

    const swapperedFiles = replaceTargetItem.toSpliced(index, 1, targetItem);

    onChange(swapperedFiles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.imageDisplayArea}>
        {images.map((file, index) => (
          <DropArea
            index={index}
            key={`drop-area-${file.name}`}
            onDrop={handleDrop}
          >
            <ImageItem
              file={file}
              index={index}
              key={`image-item-${file.name}`}
              onDelete={handleDelete}
            />
          </DropArea>
        ))}
      </div>
    </DndProvider>
  );
};
