import { Action, ActionType } from './action';
import { ProgramSelectionState } from './state';

export const reducer = (state: ProgramSelectionState, action: ActionType) => {
  switch (action.type) {
    case Action.SET_QUESTION:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
};
