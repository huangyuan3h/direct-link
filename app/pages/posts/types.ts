export type PostFormType = {
  postId?: string;
  subject: string;
  content: string;
  topics: string[];
  category: string;
  location: string;
  bilibili: string;
  youtube: string;
  images: (File | string)[];
  updatedDate?: string;
  createdDate?: string;
};

export type PostType = {
  postId: string;
  subject: string;
  content: string;
  category: string;
  location: string;
  bilibili: string;
  youtube: string;
  topics: string[];
  images: string[];
  updatedDate?: string;
  email: string;
};

export type PostResponseType = {
  postId: string;
  subject: string;
  content: string;
  category: string;
  location: string;
  bilibili: string;
  youtube: string;
  topics: string[];
  images: string[];
  email: string;
  updatedDate?: string;
};

export type PostsResponse = {
  results: PostType[];
  next_token: string;
};
