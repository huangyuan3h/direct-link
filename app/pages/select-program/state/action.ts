import { QuestionsType } from '../types';

export enum Action {
  SET_QUESTION = 'SET_QUESTION',
}

export interface SetQuestion {
  type: Action.SET_QUESTION;
  questions: QuestionsType;
}

export const setQuestion = (questions: QuestionsType): SetQuestion => {
  return {
    type: Action.SET_QUESTION,
    questions,
  };
};

export type ActionType = SetQuestion;
