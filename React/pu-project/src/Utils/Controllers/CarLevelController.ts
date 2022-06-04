import { CarLevelDto } from '../../Types/Get/CarLevelDto';
import { CreateCarLevelDto } from '../../Types/Post/CreateCarLevelDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllCarLevels = async (): Promise<CarLevelDto[]> => {
  const response = await axiosClient.get('CarLevel/GetAll');
  return response.data as CarLevelDto[];
};

export const getCarLevelById = async (id: number): Promise<CarLevelDto> => {
  const response = await axiosClient.get(`CarLevel/GetById/${id}`);
  return response.data as CarLevelDto;
};

export const addCarLevel = async (data: CreateCarLevelDto): Promise<boolean> => {
  const response = await axiosClient.post('CarLevel/Create', data);
  return response.data as boolean;
};

export const updateCarLevel = async (data: CreateCarLevelDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`CarLevel/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteCarLevel = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`CarLevel/Delete/${id}`);
  return response.data as boolean;
};
