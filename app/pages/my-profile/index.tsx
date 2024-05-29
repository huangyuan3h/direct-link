'use client';
import { User } from '@/types/user';
import { BasicInfo } from './components/basic-info';

export interface MyProfileProps {
  user: User;
}

export const MyProfile: React.FC<MyProfileProps> = ({
  user,
}: MyProfileProps) => {
  const handleUserChange = (u: User) => {
    console.log(u);
  };
  return (
    <div>
      <BasicInfo user={user} onChange={handleUserChange} />
    </div>
  );
};
