export type PostFormType = {
  postId?: string;
  subject: string;
  content: string;
  categories: string[];
  images: string[];
  updatedDate?: string;
  createdDate?: string;
};
