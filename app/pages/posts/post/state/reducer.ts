import { PostFormType } from '../../types';
import { Action, ActionType } from './action';

export const reducer = (
  state: PostFormType,
  action: ActionType
): PostFormType => {
  switch (action.type) {
    case Action.SET_SUBJECT:
      return {
        ...state,
        subject: action.subject,
      };
    case Action.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case Action.SET_CONTENT:
      return {
        ...state,
        content: action.content,
      };
    case Action.SET_TOPICS:
      return {
        ...state,
        topics: action.topics,
      };
    case Action.SET_IMAGES:
      return {
        ...state,
        images: [...action.images],
      };
    case Action.SET_BILIBILI:
      return {
        ...state,
        bilibili: action.bilibili,
      };
    case Action.SET_YOUTUBE:
      return {
        ...state,
        youtube: action.youtube,
      };
    default:
      return state;
  }
};
