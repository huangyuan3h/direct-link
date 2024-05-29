import { User } from '@/types/user';
import React, { useState } from 'react';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import { CameraFill } from 'react-bootstrap-icons';
import clsx from 'clsx';
import { Button, Form } from 'react-bootstrap';
import { DisplayBasicInfo } from './DisplayBasicInfo';
import { EditBasicInfo } from './EditBasicInfo';

const anonymousUrl = '';
export interface BasicInfoProps {
  user: User;
  onChange: (u: User) => void;
}
export const BasicInfo: React.FC<BasicInfoProps> = ({
  user,
  onChange,
}: BasicInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (user: User) => {
    console.log(user);
    setIsEditing(false);
    onChange(user);
  };

  return (
    <div className="container">
      {isEditing ? (
        <EditBasicInfo user={user} onChange={handleSaveClick} />
      ) : (
        <DisplayBasicInfo user={user} onEditClick={handleEditClick} />
      )}
    </div>
  );
};
