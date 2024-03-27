'use client';
import APIClient from '@/utils/apiClient';
import { RCICSearchForm } from './RCICSearchForm';

export const SearchSection: React.FC = () => {
  const handleSubmit = (rcic: string) => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_API);
    console.log(rcic);

    const client = new APIClient();
    client.post('rcic/search', { rcic }).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <RCICSearchForm onSubmit={handleSubmit} />
    </div>
  );
};
