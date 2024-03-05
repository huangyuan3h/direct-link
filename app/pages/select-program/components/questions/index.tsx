import Row from 'react-bootstrap/Row';
import {
  ageChoices,
  budgetChoices,
  educationChoices,
  locationChoices,
  waitingTimeChoices,
} from './config';
import { Radio } from './Radio';
import { EducationType, LocationType, QuestionsType } from '../../types';

export interface QuestionsProps {
  questions: QuestionsType;
  onChange: (questions: QuestionsType) => void;
}

export const Questions: React.FC<QuestionsProps> = ({
  questions,
  onChange,
}: QuestionsProps) => {
  const handleQuestion1Change = (val: string | number) => {
    onChange({ ...questions, age: val as number });
  };

  const handleQuestion2Change = (val: string | number) => {
    onChange({ ...questions, education: val as EducationType });
  };

  const handleQuestion3Change = (val: string | number) => {
    onChange({ ...questions, waitingTime: val as number });
  };

  const handleQuestion4Change = (val: string | number) => {
    onChange({ ...questions, budget: val as number });
  };

  const handleQuestion5Change = (val: string | number) => {
    onChange({ ...questions, location: val as LocationType });
  };

  return (
    <div className="container">
      <p className="h4">筛选符合要求的项目的：</p>
      <hr />
      <div className="pb-2">
        <p className="h6">1. 主申请人的年龄是：</p>
        <Row md={4} className="px-4">
          {ageChoices.map(({ value, label }) => {
            return (
              <Radio
                value={value}
                label={label}
                checked={questions.age === value}
                key={`question-radio-1-${value}`}
                onChange={handleQuestion1Change}
              />
            );
          })}
        </Row>
      </div>

      <div className="pb-2">
        <p className="h6">2. 主申请人的学历目前是：</p>
        <Row md={4} className="px-4">
          {educationChoices.map(({ value, label }) => {
            return (
              <Radio
                value={value}
                label={label}
                checked={questions.education === value}
                key={`question-radio-2-${value}`}
                onChange={handleQuestion2Change}
              />
            );
          })}
        </Row>
      </div>

      <div className="pb-2">
        <p className="h6">3. 愿意等待的时间：</p>
        <Row md={4} className="px-4">
          {waitingTimeChoices.map(({ value, label }) => {
            return (
              <Radio
                value={value}
                label={label}
                checked={questions.waitingTime === value}
                key={`question-radio-3-${value}`}
                onChange={handleQuestion3Change}
              />
            );
          })}
        </Row>
      </div>

      <div className="pb-2">
        <p className="h6">4. 您的预算大约是（人民币）：</p>
        <Row md={4} className="px-4">
          {budgetChoices.map(({ value, label }) => {
            return (
              <Radio
                value={value}
                label={label}
                checked={questions.budget === value}
                key={`question-radio-4-${value}`}
                onChange={handleQuestion4Change}
              />
            );
          })}
        </Row>
      </div>

      <div className="pb-2">
        <p className="h6">5. 您倾向于在哪个省登陆：</p>
        <Row md={4} className="px-4">
          {locationChoices.map(({ value, label }) => {
            return (
              <Radio
                value={value}
                label={label}
                checked={questions.location === value}
                key={`question-radio-5-${value}`}
                onChange={handleQuestion5Change}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};
