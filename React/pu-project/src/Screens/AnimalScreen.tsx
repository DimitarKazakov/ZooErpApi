import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { AnimalComponent } from '../Components/AnimalComponent';
import { Navigation } from '../Components/Navigation';

export const AnimalScreen = () => {
  return <Navigation content={<AnimalComponent />} selected={nameof(AnimalScreen)} />;
};
