import { UpdateCarExtraDto } from '../../Types/Post/UpdateCarExtraDto';
import { UpdateCarTuningDto } from '../../Types/Post/UpdateCarTuningDto';
import { CarDto } from '../../Types/Get/CarDto';
import { CreateCarDto } from '../../Types/Post/CreateCarDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllCars = async (): Promise<CarDto[]> => {
  const response = await axiosClient.get('Car/GetAll');
  return response.data as CarDto[];
};

export const getCarById = async (id: number): Promise<CarDto> => {
  const response = await axiosClient.get(`Car/GetById/${id}`);
  return response.data as CarDto;
};

export const addCar = async (data: CreateCarDto): Promise<boolean> => {
  const response = await axiosClient.post('Car/Create', data);
  return response.data as boolean;
};

export const updateCar = async (data: CreateCarDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Car/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteCar = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Car/Delete/${id}`);
  return response.data as boolean;
};

export const updateExtraToCar = async (data: UpdateCarExtraDto): Promise<boolean> => {
  const response = await axiosClient.post(`Car/UpdateExtra`, data);
  return response.data as boolean;
};

export const updateTuningToCar = async (data: UpdateCarTuningDto): Promise<boolean> => {
  const response = await axiosClient.post(`Car/UpdateTunning`, data);
  return response.data as boolean;
};
