import { TuningDto } from '../../Types/Get/TuningDto';
import { CreateTuningDto } from '../../Types/Post/CreateTuningDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllTunings = async (): Promise<TuningDto[]> => {
  const response = await axiosClient.get('Tunning/GetAll');
  return response.data as TuningDto[];
};

export const getTuningById = async (id: number): Promise<TuningDto> => {
  const response = await axiosClient.get(`Tunning/GetById/${id}`);
  return response.data as TuningDto;
};

export const addTuning = async (data: CreateTuningDto): Promise<boolean> => {
  const response = await axiosClient.post('Tunning/Create', data);
  return response.data as boolean;
};

export const updateTuning = async (data: CreateTuningDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Tunning/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteTuning = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Tunning/Delete/${id}`);
  return response.data as boolean;
};
