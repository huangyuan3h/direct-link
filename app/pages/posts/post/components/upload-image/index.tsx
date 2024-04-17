import React, { useRef, useState } from 'react';
import { S3 } from 'aws-sdk';
import styles from './upload-image.module.scss';
import Image from 'next/image';

const MAX_NUMBER = 9;

export const S3Uploader: React.FC<{}> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFiles = (filesToUpload: File[]) => {
    console.log('Uploading files:', filesToUpload);
  };

  const uploadFileProcess = (uploadedFiles: File[]) => {
    const toAddFiles = uploadedFiles.slice(0, MAX_NUMBER - files.length);

    const currentFiles = [...files, ...toAddFiles];
    setFiles(currentFiles);
    uploadFiles(currentFiles);
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
  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const renderImages = () => {
    return files.map((file, index) => (
      <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
        <Image
          src={URL.createObjectURL(file)}
          alt={`Image ${index}`}
          width={100}
          height={100}
        />
        <button onClick={() => handleDelete(index)}>Delete</button>
      </div>
    ));
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
      <div>{renderImages()}</div>
    </div>
  );
};

export default S3Uploader;
