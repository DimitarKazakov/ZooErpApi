import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { CarLevelTable } from '../../Components/Tables/CarLevelTable';

export const CarLevelScreen = () => {
  return <Navigation content={<CarLevelTable />} selected={nameof(CarLevelTable)} />;
};
