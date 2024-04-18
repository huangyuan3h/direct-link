import styles from './upload-image.module.scss';
import Image from 'next/image';
import { CloseButton } from 'react-bootstrap';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newImages = Array.from(images);
    const [removed] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, removed);

    onChange(newImages);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="imageGrid">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.imageDisplayArea}
            >
              {images.map((file, index) => (
                <Draggable
                  key={file.name}
                  draggableId={file.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      key={`display-image-${file.name}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.imageWrapper}
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index}`}
                        width={100}
                        height={100}
                        className={styles.image}
                      />
                      <CloseButton
                        onClick={() => handleDelete(index)}
                        className={styles.closeButton}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
