'use client';
import { useReducer } from 'react';
import { SubjectInput } from './components/subject';
import { reducer } from './state/reducer';
import { initialState } from './state/state';
import { setCategories, setContent, setSubject } from './state/action';
import { ContentInput } from './components/content';
import 'react-quill/dist/quill.snow.css';
import { Categories } from './components/categories';

export const Post: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { subject, content, categories } = state;

  const handleSubjectChange = (subject: string) => {
    dispatch(setSubject(subject));
  };

  const handleContentChange = (content: string) => {
    dispatch(setContent(content));
  };

  const handleCategoriesChange = (cs: string[]) => {
    dispatch(setCategories(cs));
  };
  return (
    <div className="container pt-8">
      <h3>发布帖子：</h3>
      <SubjectInput subject={subject} onChange={handleSubjectChange} />
      <ContentInput content={content} onChange={handleContentChange} />
      <Categories categories={categories} onChange={handleCategoriesChange} />
    </div>
  );
};
