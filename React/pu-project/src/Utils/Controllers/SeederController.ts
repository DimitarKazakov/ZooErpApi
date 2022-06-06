import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const seedAnimals = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedAnimals');
  return response.data as number;
};

export const seedCages = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedCages');
  return response.data as number;
};

export const seedEvents = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedEvents');
  return response.data as number;
};

export const seedFoods = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedFoods');
  return response.data as number;
};

export const seedAllData = async (): Promise<number> => {
  const response = await axiosClient.post('Seeder/SeedAllData');
  return response.data as number;
};

export const resetDb = async (): Promise<boolean> => {
  const response = await axiosClient.post('Seeder/ResetDb');
  return response.data as boolean;
};
