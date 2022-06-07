import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { CagesTable } from '../../Components/Tables/CagesTable';

export const CageScreen = () => {
  return <Navigation content={<CagesTable />} selected={nameof(CagesTable)} />;
};
