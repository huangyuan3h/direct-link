export type PostFormType = {
  postId?: string;
  subject: string;
  content: string;
  categories: string[];
  images: File[];
  updatedDate?: string;
  createdDate?: string;
};

export type PostType = {
  postId?: string;
  subject: string;
  content: string;
  categories: string[];
  images: string[];
  updatedDate?: string;
  createdDate?: string;
};

export type PostResponseType = {
  postId: string;
  subject: string;
  content: string;
  categories: string[];
  images: string[];
};

export type PostsResponse = {
  results: PostType[];
  next_token: string;
};
