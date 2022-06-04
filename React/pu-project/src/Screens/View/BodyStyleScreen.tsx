import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { BodyStyleTable } from '../../Components/Tables/BodyStyleTable';

export const BodyStyleScreen = () => {
  return <Navigation content={<BodyStyleTable />} selected={nameof(BodyStyleTable)} />;
};
