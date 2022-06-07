import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { CageComponent } from '../Components/CageComponent';
import { Navigation } from '../Components/Navigation';

export const CageScreen = () => {
  return <Navigation content={<CageComponent />} selected={nameof(CageScreen)} />;
};
