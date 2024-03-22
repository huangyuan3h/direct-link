'use client';
import { RCICSearchForm } from './RCICSearchForm';

export const SearchSection: React.FC = () => {
  const handleSubmit = (rcic: string) => {
    console.log(rcic);
  };
  return (
    <div>
      <RCICSearchForm onSubmit={handleSubmit} />
    </div>
  );
};
