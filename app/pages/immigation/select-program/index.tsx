'use client';

import { useReducer } from 'react';
import { ProgramTable } from './components/program-table';
import { Questions } from './components/questions';
import styles from './select-program.module.scss';
import { reducer } from './state/reducer';
import { initialState } from './state/state';
import { setQuestion } from './state/action';
import { QuestionsType } from './types';

export const SelectProgram: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleQuestionChange = (questions: QuestionsType) => {
    dispatch(setQuestion(questions));
  };

  return (
    <section className={styles.mainArea}>
      <Questions questions={state.questions} onChange={handleQuestionChange} />
      <ProgramTable />
    </section>
  );
};
