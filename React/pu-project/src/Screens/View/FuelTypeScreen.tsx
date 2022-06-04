import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { FuelTypeTable } from '../../Components/Tables/FuelTypeTable';

export const FuelTypeScreen = () => {
  return <Navigation content={<FuelTypeTable />} selected={nameof(FuelTypeTable)} />;
};
