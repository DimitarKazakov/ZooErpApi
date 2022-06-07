import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { AnimalsTable } from '../../Components/Tables/AnimalsTable';

export const AnimalScreen = () => {
  return <Navigation content={<AnimalsTable />} selected={nameof(AnimalsTable)} />;
};
