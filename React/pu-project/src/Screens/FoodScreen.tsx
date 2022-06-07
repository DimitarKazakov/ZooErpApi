import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { FoodComponent } from '../Components/FoodComponent';
import { Navigation } from '../Components/Navigation';

export const FoodScreen = () => {
  return <Navigation content={<FoodComponent />} selected={nameof(FoodScreen)} />;
};
