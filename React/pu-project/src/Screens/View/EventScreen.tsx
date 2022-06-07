import React from 'react';
import { nameof } from 'ts-simple-nameof';
import { Navigation } from '../../Components/Navigation';
import { EventsTable } from '../../Components/Tables/EventsTable';

export const EventScreen = () => {
  return <Navigation content={<EventsTable />} selected={nameof(EventsTable)} />;
};
