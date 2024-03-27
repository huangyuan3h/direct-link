'use client';
import APIClient from '@/utils/apiClient';
import { RCICSearchForm } from './RCICSearchForm';
import { RCIC, RCICSearchResponse } from '../types';
import { useState } from 'react';
import { ShowProfile } from './ShowProfile';
import { Loading } from './Loading';

export const SearchSection: React.FC = () => {
  const [rcic, setRcic] = useState<RCIC | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (rcic: string) => {
    setLoading(true);
    const client = new APIClient();
    client
      .post('rcic/search', { rcic })
      .then((response: RCICSearchResponse) => {
        if (response) {
          setRcic(response.results[0]);
          setLoading(false);
        }
      });
  };
  return (
    <div>
      <RCICSearchForm onSubmit={handleSubmit} />
      {loading ? <Loading /> : <ShowProfile rcic={rcic} />}
    </div>
  );
};
