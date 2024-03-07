import { QuestionsType } from '../types';

export interface ProgramSelectionState {
  questions: QuestionsType;
}

export const initialState: ProgramSelectionState = {
  questions: {
    age: 30,
    education: 'highSchool',
    waitingTime: 12,
    budget: 40,
    location: 'Ontario',
  },
};
