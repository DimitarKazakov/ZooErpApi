import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { ConditionTable } from '../../Components/Tables/ConditionTable';

export const ConditionScreen = () => {
  return <Navigation content={<ConditionTable />} selected={nameof(ConditionTable)} />;
};
