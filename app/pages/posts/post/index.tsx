'use client';
import { useReducer } from 'react';
import { SubjectInput } from './components/subject';
import { reducer } from './state/reducer';
import { initialState } from './state/state';
import {
  setCategories,
  setContent,
  setImages,
  setSubject,
} from './state/action';
import { ContentInput } from './components/content';
import 'react-quill/dist/quill.snow.css';
import { Categories } from './components/categories';
import ImageUploadView from './components/upload-image';
import { Button } from 'react-bootstrap';

export const Post: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { subject, content, categories, images } = state;

  const handleSubjectChange = (subject: string) => {
    dispatch(setSubject(subject));
  };

  const handleContentChange = (content: string) => {
    dispatch(setContent(content));
  };

  const handleCategoriesChange = (cs: string[]) => {
    dispatch(setCategories(cs));
  };
  const handleImagesChange = (imgs: File[]) => {
    dispatch(setImages(imgs));
  };
  return (
    <div className="container pt-8">
      <h5>发布帖子：</h5>
      <SubjectInput subject={subject} onChange={handleSubjectChange} />
      <ContentInput content={content} onChange={handleContentChange} />
      <Categories categories={categories} onChange={handleCategoriesChange} />
      <ImageUploadView images={images} onImageChange={handleImagesChange} />

      <div className="my-3 flex flex-row-reverse">
        <Button className="primary">发布帖子</Button>
      </div>
    </div>
  );
};
