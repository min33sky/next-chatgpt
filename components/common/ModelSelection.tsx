'use client';

import React from 'react';
import useSWR from 'swr';
import Select from 'react-select';
import { Option } from '@/pages/api/getEngines';

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json());

type ModelsResponse = {
  modelOptions: Option[];
};

/**
 * AI Model 셀렉터
 */
export default function ModelSelection() {
  const { data: models, isLoading } = useSWR<ModelsResponse>(
    'models',
    fetchModels,
  );

  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        classNames={{
          control: (state) => 'bg-[#434654] border-[#434654]',
        }}
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        menuPosition="fixed"
        onChange={(e) => setModel(e.value)}
        isLoading={isLoading}
      />
    </div>
  );
}
