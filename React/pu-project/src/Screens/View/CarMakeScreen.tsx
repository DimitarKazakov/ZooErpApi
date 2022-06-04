import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { CarMakeTable } from '../../Components/Tables/CarMakeTable';

export const CarMakeScreen = () => {
  return <Navigation content={<CarMakeTable />} selected={nameof(CarMakeTable)} />;
};
