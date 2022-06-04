import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { TunningTable } from '../../Components/Tables/TunningTable';

export const TunningScreen = () => {
  return <Navigation content={<TunningTable />} selected={nameof(TunningTable)} />;
};
