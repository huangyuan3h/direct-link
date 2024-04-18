import React, { useRef } from 'react';
import styles from './upload-image.module.scss';

import { DisplayImages } from './display-images';

const MAX_NUMBER = 9;

function removeDuplicateFile(array: File[]): File[] {
  const uniqueFiles: File[] = [];
  const filePaths: Set<string> = new Set();

  for (const file of array) {
    const filePath = file.name;
    if (!filePaths.has(filePath)) {
      filePaths.add(filePath);
      uniqueFiles.push(file);
    }
  }

  return uniqueFiles;
}

export interface ImageUploadViewProps {
  images: File[];
  onImageChange: (images: File[]) => void;
}

export const ImageUploadView: React.FC<ImageUploadViewProps> = ({
  images,
  onImageChange,
}: ImageUploadViewProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFileProcess = (uploadedFiles: File[]) => {
    const toAddFiles = uploadedFiles.slice(0, MAX_NUMBER - images.length);

    const currentFiles = removeDuplicateFile([...images, ...toAddFiles]);
    onImageChange(currentFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let uploadedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];

    uploadFileProcess(uploadedFiles);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    let uploadedFiles = event.dataTransfer.files
      ? Array.from(event.dataTransfer.files)
      : [];

    uploadFileProcess(uploadedFiles);
  };

  const handleChange = (files: File[]) => {
    onImageChange(files);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.webp"
        multiple
      />
      <div
        className={styles.uploadImageArea}
        onDrop={handleFileDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={handleDivClick}
      >
        + 拖动或点击来添加图片
      </div>
      <div className="text-muted  mt-1">
        <small>添加图片来提高曝光度，图片不能重复，最多添加9张图片</small>
      </div>
      <DisplayImages images={images} onChange={handleChange} />
    </div>
  );
};

export default ImageUploadView;
