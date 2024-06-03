import { User } from '@/types/user';
import React, { useState } from 'react';
import { DisplayBasicInfo } from './DisplayBasicInfo';
import { EditBasicInfo } from './EditBasicInfo';

export interface BasicInfoProps {
  user: User;
  onChange: (user: User, avatar: File | null) => void;
}
export const BasicInfo: React.FC<BasicInfoProps> = ({
  user,
  onChange,
}: BasicInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (user: User, avatar: File | null) => {
    setIsEditing(false);
    onChange(user, avatar);
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
