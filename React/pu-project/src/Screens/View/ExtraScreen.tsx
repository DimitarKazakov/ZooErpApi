import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { ExtraTable } from '../../Components/Tables/ExtraTable';

export const ExtraScreen = () => {
  return <Navigation content={<ExtraTable />} selected={nameof(ExtraTable)} />;
};
