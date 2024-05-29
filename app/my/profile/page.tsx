import { MyProfile } from '@/app/pages/my-profile';
import { Header } from '@/components/header';
import { User } from '@/types/user';
import APIClient from '@/utils/apiClient';
import { cookies } from 'next/headers';

const getMyProfile = async (): Promise<User> => {
  'use server';
  const cookieStore = cookies();
  const authCookie = cookieStore.get('Authorization');
  const client = new APIClient(authCookie?.value);
  return await client.get('/my/profile');
};

export default async function MyProfilePage() {
  // the profile is different from jwt token content
  const user = await getMyProfile();
  return (
    <main className="">
      <Header />
      <MyProfile user={user} />
    </main>
  );
}

export const revalidate = 60;
