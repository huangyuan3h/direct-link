export type PostFormType = {
  postId?: string;
  subject: string;
  content: string;
  topics: string[];
  category: string;
  location: string;
  images: File[];
  updatedDate?: string;
  createdDate?: string;
};

export type PostType = {
  postId: string;
  subject: string;
  content: string;
  category: string;
  location: string;
  topics: string[];
  images: string[];
  updatedDate?: string;
  createdDate?: string;
};

export type PostResponseType = {
  postId: string;
  subject: string;
  content: string;
  category: string;
  location: string;
  topics: string[];
  images: string[];
};

export type PostsResponse = {
  results: PostType[];
  next_token: string;
};
