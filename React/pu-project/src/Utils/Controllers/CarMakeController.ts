import { CarMakeDto } from '../../Types/Get/CarMakeDto';
import { CreateCarMakeDto } from '../../Types/Post/CreateCarMakeDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllCarMakes = async (): Promise<CarMakeDto[]> => {
  const response = await axiosClient.get('CarMake/GetAll');
  return response.data as CarMakeDto[];
};

export const getCarMakeById = async (id: number): Promise<CarMakeDto> => {
  const response = await axiosClient.get(`CarMake/GetById/${id}`);
  return response.data as CarMakeDto;
};

export const addCarMake = async (data: CreateCarMakeDto): Promise<boolean> => {
  const response = await axiosClient.post('CarMake/Create', data);
  return response.data as boolean;
};

export const updateCarMake = async (data: CreateCarMakeDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`CarMake/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteCarMake = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`CarMake/Delete/${id}`);
  return response.data as boolean;
};
