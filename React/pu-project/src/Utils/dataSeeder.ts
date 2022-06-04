import { notification } from 'antd';
import {
  seedBodyStyles,
  seedCarLevels,
  seedCarMakes,
  seedColors,
  seedConditions,
  seedExtras,
  seedFuelTypes,
  seedTunnings,
} from './Controllers/SeederController';

export const seedFuelTypesHelper = async () => {
  const count = await seedFuelTypes();
  if (count) {
    notification.success({ message: `${count} Fuel Types were seeded` });
  } else {
    notification.warning({ message: `No Fuel Types were seeded...` });
  }
};

export const seedColorsHelper = async () => {
  const count = await seedColors();
  if (count) {
    notification.success({ message: `${count} Colors were seeded` });
  } else {
    notification.warning({ message: `No Colors were seeded...` });
  }
};

export const seedConditionsHelper = async () => {
  const count = await seedConditions();
  if (count) {
    notification.success({ message: `${count} Conditions were seeded` });
  } else {
    notification.warning({ message: `No Conditions were seeded...` });
  }
};

export const seedCarMakesHelper = async () => {
  const count = await seedCarMakes();
  if (count) {
    notification.success({ message: `${count} Car Makes were seeded` });
  } else {
    notification.warning({ message: `No Car Makes were seeded...` });
  }
};

export const seedCarLevelsHelper = async () => {
  const count = await seedCarLevels();
  if (count) {
    notification.success({ message: `${count} Car Levels were seeded` });
  } else {
    notification.warning({ message: `No Car Levels were seeded...` });
  }
};

export const seedBodyStylesHelper = async () => {
  const count = await seedBodyStyles();
  if (count) {
    notification.success({ message: `${count} Body Styles were seeded` });
  } else {
    notification.warning({ message: `No Body Styles were seeded...` });
  }
};

export const seedExtrasHelper = async () => {
  const count = await seedExtras();
  if (count) {
    notification.success({ message: `${count} Extras were seeded` });
  } else {
    notification.warning({ message: `No Extras were seeded...` });
  }
};

export const seedTunningsHelper = async () => {
  const count = await seedTunnings();
  if (count) {
    notification.success({ message: `${count} Tunnings were seeded` });
  } else {
    notification.warning({ message: `No Tunnings were seeded...` });
  }
};
