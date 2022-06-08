import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { CageComponent } from '../Components/CageComponent';
import { Navigation } from '../Components/Navigation';

export const CageHomeScreen = () => {
  return <Navigation content={<CageComponent />} selected={nameof(CageHomeScreen)} />;
};
