import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { ColorsTable } from '../../Components/Tables/ColorsTable';
import { Navigation } from '../../Components/Navigation';

export const ColorScreen = () => {
  return <Navigation content={<ColorsTable />} selected={nameof(ColorsTable)} />;
};
