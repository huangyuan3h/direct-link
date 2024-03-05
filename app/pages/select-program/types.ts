export type EducationType = 'highSchool' | 'bachelor' | 'master' | 'doctor';

export type LocationType =
  | 'Ontario'
  | 'Quebec'
  | 'British Columbia'
  | 'Alberta'
  | 'Manitoba'
  | 'Saskatchewan'
  | 'Atlantic'; // Nova Scotia & New Brunswick & Prince Edward Island & Newfoundland and Labrador;

export type QuestionsType = {
  age: number;
  education: EducationType;
  waitingTime: number; // months
  budget: number; // n*10k rmb
  location: LocationType;
};

export type ChoiceConfigurationType = {
  label: string;
  value: string | number;
};
