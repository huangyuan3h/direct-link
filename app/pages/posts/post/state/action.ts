export enum Action {
  SET_SUBJECT = 'SET_SUBJECT',
  SET_CONTENT = 'SET_CONTENT',
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

export type ActionType = SetSubject | SetContent;
