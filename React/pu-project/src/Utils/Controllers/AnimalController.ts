import { getAxiosClient } from '../axiosClient';
import { AnimalDto } from '../../Types/Get/AnimalDto';
import qs from 'qs';
import { FilterDto } from '../../Types/FilterDto';
import { AnimalOptionsDto } from '../../Types/Get/AnimalOptionsDto';
import { CreateAnimalDto } from '../../Types/Post/CreateAnimalDto';

const axiosClient = getAxiosClient();

export const getAllAnimals = async (filter?: FilterDto): Promise<AnimalDto[]> => {
  const query = qs.stringify(filter);
  const response = await axiosClient.get(`Animal/GetAll?${query}`);
  return response.data as AnimalDto[];
};

export const addAnimal = async (data: CreateAnimalDto): Promise<boolean> => {
  const response = await axiosClient.post('Animal/Create', data);
  return response.data as boolean;
};

export const updateAnimal = async (data: CreateAnimalDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Animal/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteAnimal = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Animal/Delete/${id}`);
  return response.data as boolean;
};

export const getAnimalOptions = async (): Promise<AnimalOptionsDto[]> => {
  const response = await axiosClient.get('Animal/GetOptions');
  return response.data as AnimalOptionsDto[];
};
