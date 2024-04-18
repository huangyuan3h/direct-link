export type PostFormType = {
  postId?: string;
  subject: string;
  content: string;
  categories: string[];
  images: File[];
  updatedDate?: string;
  createdDate?: string;
};
