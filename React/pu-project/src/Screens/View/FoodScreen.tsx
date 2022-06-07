import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { FoodsTable } from '../../Components/Tables/FoodsTable';

export const FoodScreen = () => {
  return <Navigation content={<FoodsTable />} selected={nameof(FoodsTable)} />;
};
