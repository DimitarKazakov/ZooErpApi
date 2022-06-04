import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Hello } from '../Components/HelloComponent';
import { Navigation } from '../Components/Navigation';

export const HomeScreen = () => {
  return <Navigation content={<Hello />} selected={nameof(HomeScreen)} />;
};
