import { CreateFuelTypeDto } from '../../Types/Post/CreateFuelTypeDto';
import { FuelTypeDto } from '../../Types/Get/FuelTypeDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllFuelTypes = async (): Promise<FuelTypeDto[]> => {
  const response = await axiosClient.get('FuelType/GetAll');
  return response.data as FuelTypeDto[];
};

export const getFuelTypeById = async (id: number): Promise<FuelTypeDto> => {
  const response = await axiosClient.get(`FuelType/GetById/${id}`);
  return response.data as FuelTypeDto;
};

export const addFuelType = async (data: CreateFuelTypeDto): Promise<boolean> => {
  const response = await axiosClient.post('FuelType/Create', data);
  return response.data as boolean;
};

export const updateFuelType = async (data: CreateFuelTypeDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`FuelType/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteFuelType = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`FuelType/Delete/${id}`);
  return response.data as boolean;
};
