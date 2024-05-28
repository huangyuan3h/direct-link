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

export default async function MyProfile() {
  const user = await getMyProfile();
  return (
    <main className="">
      <Header />
    </main>
  );
}

export const revalidate = 60;
