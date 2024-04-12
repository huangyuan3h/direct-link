import { EducationType } from '../../types';

export type ProgramItemType = {
  value: string;
  name: string;
  education: EducationType[];
};

export const programConfig: ProgramItemType[] = [];
