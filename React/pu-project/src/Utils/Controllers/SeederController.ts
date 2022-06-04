import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const seedFuelTypes = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedFuelTypes');
  return response.data as number;
};

export const seedBodyStyles = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedBodyStyles');
  return response.data as number;
};

export const seedColors = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedColors');
  return response.data as number;
};

export const seedCarLevels = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedCarLevels');
  return response.data as number;
};

export const seedCarMakes = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedCarMakes');
  return response.data as number;
};

export const seedConditions = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedConditions');
  return response.data as number;
};

export const seedExtras = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedExtras');
  return response.data as number;
};

export const seedTunnings = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedTunnings');
  return response.data as number;
};
