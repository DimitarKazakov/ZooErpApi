import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { CarTable } from '../../Components/Tables/CarTable';

export const CarScreen = () => {
  return <Navigation content={<CarTable />} selected={nameof(CarTable)} />;
};
