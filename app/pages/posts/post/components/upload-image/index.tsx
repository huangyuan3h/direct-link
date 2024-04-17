import React, { useState } from 'react';
import { S3 } from 'aws-sdk';

export const S3Uploader: React.FC<{}> = () => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const s3 = new S3({
      region: 'your-region',
      accessKeyId: 'your-access-key-id',
      secretAccessKey: 'your-secret-access-key',
    });

    const params = {
      Bucket: 'your-bucket-name',
      Key: file.name,
      Body: file,
    };

    try {
      await s3.upload(params).promise();
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div
        onDrop={handleFileDrop}
        onDragOver={(event) => event.preventDefault()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        Drop your file here
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default S3Uploader;
