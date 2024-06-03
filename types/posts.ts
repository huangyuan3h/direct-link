import { PostType } from '@/app/pages/posts/types';

export interface PostsResponse {
  results: PostType[];
  next_token: string;
}
