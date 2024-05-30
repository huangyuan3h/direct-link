'use client';
import { User } from '@/types/user';
import { BasicInfo } from './components/basic-info';
import { useState } from 'react';
import { uploadFileToS3 } from '@/utils/s3Upload';
import APIClient from '@/utils/apiClient';
import { toast } from 'react-toastify';
import { toastMessages } from '@/utils/toastMessage';

export interface MyProfileProps {
  user: User;
}

export const MyProfile: React.FC<MyProfileProps> = ({
  user,
}: MyProfileProps) => {
  const [currentUser, setUser] = useState(user);
  const handleUserChange = async (u: User, avatar: File | null) => {
    let avatarUrl;

    if (avatar) {
      const response = await (await fetch(`/api/getAvatarUrl`)).json();
      avatarUrl = await uploadFileToS3(response.url, avatar);
    }

    // send to server

    const client = new APIClient();

    const updatedUser = { ...user, avatar: avatarUrl ?? u.avatar };

    const res = await toast.promise(
      client.post('my/profle', updatedUser),
      {
        success: toastMessages.UPDATE_SUCCESS,
        pending: toastMessages.UPDATE_LOADING,
        error: toastMessages.UPDATE_ERROR,
      },
      { position: 'top-center' }
    );

    console.log(res);

    setUser(updatedUser);
  };
  return (
    <div>
      <BasicInfo user={currentUser} onChange={handleUserChange} />
    </div>
  );
};
