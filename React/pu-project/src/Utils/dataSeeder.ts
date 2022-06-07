import { notification } from 'antd';
import {
  resetDb,
  seedAllData,
  seedAnimals,
  seedCages,
  seedEvents,
  seedFoods,
} from './Controllers/SeederController';

export const seedAnimalsHelper = async () => {
  const count = await seedAnimals();
  if (count) {
    notification.success({ message: `${count} Animals were seeded` });
  } else {
    notification.warning({ message: `No Animals were seeded...` });
  }
};

export const seedCagesHelper = async () => {
  const count = await seedCages();
  if (count) {
    notification.success({ message: `${count} Cages were seeded` });
  } else {
    notification.warning({ message: `No Cages were seeded...` });
  }
};

export const seedEventsHelper = async () => {
  const count = await seedEvents();
  if (count) {
    notification.success({ message: `${count} Events were seeded` });
  } else {
    notification.warning({ message: `No Events were seeded...` });
  }
};

export const seedFoodsHelper = async () => {
  const count = await seedFoods();
  if (count) {
    notification.success({ message: `${count} Foods were seeded` });
  } else {
    notification.warning({ message: `No Foods were seeded...` });
  }
};

export const seedAllDataHelper = async () => {
  const success = await seedAllData();
  if (success) {
    notification.success({ message: 'All Data was seeded' });
  } else {
    notification.warning({ message: 'Something went wrong...' });
  }
};

export const resetDatabaseHelper = async () => {
  const success = await resetDb();
  if (success) {
    notification.success({ message: 'Database was reset' });
  } else {
    notification.warning({ message: 'Something went wrong...' });
  }
};
