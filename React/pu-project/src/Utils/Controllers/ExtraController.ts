import { ExtraDto } from '../../Types/Get/ExtraDto';
import { CreateExtraDto } from '../../Types/Post/CreateExtraDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllExtras = async (): Promise<ExtraDto[]> => {
  const response = await axiosClient.get('Extra/GetAll');
  return response.data as ExtraDto[];
};

export const getExtraById = async (id: number): Promise<ExtraDto> => {
  const response = await axiosClient.get(`Extra/GetById/${id}`);
  return response.data as ExtraDto;
};

export const addExtra = async (data: CreateExtraDto): Promise<boolean> => {
  const response = await axiosClient.post('Extra/Create', data);
  return response.data as boolean;
};

export const updateExtra = async (data: CreateExtraDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Extra/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteExtra = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Extra/Delete/${id}`);
  return response.data as boolean;
};
