export enum Action {
  SET_SUBJECT = 'SET_SUBJECT',
  SET_CATEGORY = 'SET_CATEGORY',
  SET_CONTENT = 'SET_CONTENT',
  SET_TOPICS = 'SET_TOPICS',
  SET_IMAGES = 'SET_IMAGES',
}

export interface SetSubject {
  type: Action.SET_SUBJECT;
  subject: string;
}

export const setSubject = (subject: string): SetSubject => {
  return {
    type: Action.SET_SUBJECT,
    subject,
  };
};

export interface SetCategory {
  type: Action.SET_CATEGORY;
  category: string;
}

export const setCategory = (category: string): SetCategory => {
  return {
    type: Action.SET_CATEGORY,
    category,
  };
};

export interface SetContent {
  type: Action.SET_CONTENT;
  content: string;
}

export const setContent = (content: string): SetContent => {
  return {
    type: Action.SET_CONTENT,
    content,
  };
};

export interface SetTopics {
  type: Action.SET_TOPICS;
  topics: string[];
}

export const setCategories = (topics: string[]): SetTopics => {
  return {
    type: Action.SET_TOPICS,
    topics,
  };
};

export interface SetImages {
  type: Action.SET_IMAGES;
  images: File[];
}

export const setImages = (images: File[]): SetImages => {
  return {
    type: Action.SET_IMAGES,
    images,
  };
};

export type ActionType =
  | SetSubject
  | SetCategory
  | SetContent
  | SetTopics
  | SetImages;
