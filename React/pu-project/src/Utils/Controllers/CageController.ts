import { getAxiosClient } from '../axiosClient';
import qs from 'qs';
import { FilterDto } from '../../Types/FilterDto';
import { CageDto } from '../../Types/Get/CageDto';
import { CreateCageDto } from '../../Types/Post/CreateCageDto';
import { CageOptionsDto } from '../../Types/Get/CageOptionsDto';

const axiosClient = getAxiosClient();

export const getAllCages = async (filter?: FilterDto): Promise<CageDto[]> => {
  const query = qs.stringify(filter);
  const response = await axiosClient.get(`Cage/GetAll?${query}`);
  return response.data as CageDto[];
};

export const addCage = async (data: CreateCageDto): Promise<boolean> => {
  const response = await axiosClient.post('Cage/Create', data);
  return response.data as boolean;
};

export const updateCage = async (data: CreateCageDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Cage/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteCage = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Cage/Delete/${id}`);
  return response.data as boolean;
};

export const getCageOptions = async (): Promise<CageOptionsDto[]> => {
  const response = await axiosClient.get('Cage/GetOptions');
  return response.data as CageOptionsDto[];
};
