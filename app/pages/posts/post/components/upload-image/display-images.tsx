import styles from './upload-image.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ImageItem } from './ImageItem';
import { DropArea } from './DropArea';

export interface DisplayImagesProps {
  images: (File | string)[];
  onChange: (images: (File | string)[]) => void;
}

export const DisplayImages: React.FC<DisplayImagesProps> = ({
  images,
  onChange,
}: DisplayImagesProps) => {
  const handleDelete = (name: string) => {
    const updatedFiles = [...images];
    const index = updatedFiles.findIndex((file) =>
      typeof file === 'string' ? file === name : file.name === name
    );
    if (index !== -1) {
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
    }
  };

  const handleDrop = (item: File, targetIndex: number) => {
    const index = images.findIndex((file) =>
      typeof file === 'string' ? false : file.name === item.name
    );
    if (index === -1 || index === targetIndex) {
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
            key={`drop-area-${typeof file === 'string' ? file : file.name}`}
            onDrop={handleDrop}
          >
            <ImageItem
              file={file}
              key={`image-item-${typeof file === 'string' ? file : file.name}`}
              onDelete={handleDelete}
            />
          </DropArea>
        ))}
      </div>
    </DndProvider>
  );
};
