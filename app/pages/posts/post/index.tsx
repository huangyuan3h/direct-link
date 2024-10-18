'use client';
import { useReducer, useState } from 'react';
import { SubjectInput } from './components/subject';
import { reducer } from './state/reducer';
import { initialState } from './state/state';
import {
  setBilibili,
  setCategories,
  setCategory,
  setContent,
  setImages,
  setSubject,
  setYoutube,
} from './state/action';
import { ContentInput } from './components/content';
import 'react-quill/dist/quill.snow.css';
import { Topics } from './components/topics';
import ImageUploadView from './components/upload-image';
import { Button } from 'react-bootstrap';
import { uploadFiles } from './components/upload-image/uploadImageProcess';
import { toast } from 'react-toastify';
import { toastMessages } from '@/utils/toastMessage';
import APIClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { PostResponseType } from '../types';
import { Category } from './components/category';
import { VideoInputInput } from './components/video';

interface PostProps {
  posts?: PostResponseType;
}

export const Post: React.FC<PostProps> = ({ posts }: PostProps) => {
  const [state, dispatch] = useReducer(reducer, posts ? posts : initialState);

  const [loading, setLoading] = useState(false);
  const {
    postId,
    subject,
    category,
    location,
    content,
    topics,
    images,
    bilibili,
    youtube,
  } = state;

  const router = useRouter();

  const handleSubjectChange = (subject: string) => {
    dispatch(setSubject(subject));
  };

  const handleContentChange = (content: string) => {
    dispatch(setContent(content));
  };

  const handleCategoriesChange = (cs: string[]) => {
    dispatch(setCategories(cs));
  };
  const handleImagesChange = (imgs: (File | string)[]) => {
    dispatch(setImages(imgs));
  };
  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleBilibiliChange = (bilibili: string) => {
    dispatch(setBilibili(bilibili));
  };

  const handleYoutubeChange = (youtube: string) => {
    dispatch(setYoutube(youtube));
  };
  const handleClickPost = async () => {
    setLoading(true);
    // step 1 check if the content is satisified to post
    if (subject.length < 6) {
      toast.error('标题内容太少，再加点吧', {
        position: 'top-center',
      });
      setLoading(false);
      return;
    }

    const postProcess = async () => {
      // step 2: upload images
      const images = await uploadFiles(state.images);

      // step 3 post success and do redirect

      const client = new APIClient();
      const post = (await client.post('post/createOrUpdate', {
        postId,
        subject,
        content,
        category,
        location,
        topics,
        images,
        bilibili,
        youtube,
      })) as PostResponseType;

      setTimeout(() => {
        router.push(routes.viewPost(post.postId));
      }, 3000);
    };

    await toast.promise(
      postProcess(),
      {
        success: toastMessages.CREATE_POST_SUCCESS,
        pending: toastMessages.CREATE_POST_LOADING,
        error: toastMessages.CREATE_POST_ERROR,
      },
      { position: 'top-center' }
    );
  };
  return (
    <div className="container pt-8">
      <h5>发布帖子：</h5>
      <SubjectInput subject={subject} onChange={handleSubjectChange} />
      <ContentInput content={content} onChange={handleContentChange} />
      <VideoInputInput
        bilibili={bilibili}
        youtube={youtube}
        onBilibiliChange={handleBilibiliChange}
        onYoutubeChange={handleYoutubeChange}
      />
      <Category category={category} onChange={handleCategoryChange} />
      <Topics topics={topics} onChange={handleCategoriesChange} />
      <ImageUploadView images={images} onImageChange={handleImagesChange} />

      <div className="my-3 flex flex-row-reverse">
        <Button
          className="primary"
          disabled={loading}
          onClick={handleClickPost}
        >
          发布帖子
        </Button>
      </div>
    </div>
  );
};
