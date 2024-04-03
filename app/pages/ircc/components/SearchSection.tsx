'use client';
import APIClient from '@/utils/apiClient';
import { RCICSearchForm } from './RCICSearchForm';
import { RCIC, RCICSearchResponse } from '../types';
import { useState } from 'react';
import { ShowProfile } from './ShowProfile';
import { toast } from 'react-toastify';
import { toastMessages } from '@/utils/toastMessage';

export const SearchSection: React.FC = () => {
  const [rcic, setRcic] = useState<RCIC | null>(null);

  const handleSubmit = async (rcic: string) => {
    const client = new APIClient();
    const response: RCICSearchResponse = await toast.promise(
      client.post('rcic/search', { rcic }),
      {
        success: toastMessages.LOADING_RCIC_SUCCESS,
        pending: toastMessages.LOADING,
        error: toastMessages.REQUEST_ERROR,
      },
      { position: 'top-center' }
    );

    if (response) {
      setRcic(response.results[0]);
    }
  };
  return (
    <div>
      <RCICSearchForm onSubmit={handleSubmit} />
      {rcic && <ShowProfile rcic={rcic} />}
    </div>
  );
};
