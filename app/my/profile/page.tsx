import { MyProfile } from '@/app/pages/my-profile';
import { Header } from '@/components/header';
import { PostsResponse } from '@/types/posts';
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

const getMyPosts = async (): Promise<PostsResponse> => {
  'use server';
  const cookieStore = cookies();
  const authCookie = cookieStore.get('Authorization');
  const client = new APIClient(authCookie?.value);
  return await client.post('/my/posts', {
    limit: 50,
    next_token: '',
  });
};

export default async function MyProfilePage() {
  // the profile is different from jwt token content
  const user = await getMyProfile();
  const postsResponse = await getMyPosts();

  const { results, next_token } = postsResponse;

  return (
    <main className="">
      <Header />
      <MyProfile user={user} posts={results} nextToken={next_token ?? ''} />
    </main>
  );
}

export const revalidate = 60;
