import { BodyStyleDto } from '../../Types/Get/BodyStyleDto';
import { CreateBodyStyleDto } from '../../Types/Post/CreateBodyStyleDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllBodyStyles = async (): Promise<BodyStyleDto[]> => {
  const response = await axiosClient.get('BodyStyle/GetAll');
  return response.data as BodyStyleDto[];
};

export const getBodyStyleById = async (id: number): Promise<BodyStyleDto> => {
  const response = await axiosClient.get(`BodyStyle/GetById/${id}`);
  return response.data as BodyStyleDto;
};

export const addBodyStyle = async (data: CreateBodyStyleDto): Promise<boolean> => {
  const response = await axiosClient.post('BodyStyle/Create', data);
  return response.data as boolean;
};

export const updateBodyStyle = async (data: CreateBodyStyleDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`BodyStyle/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteBodyStyle = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`BodyStyle/Delete/${id}`);
  return response.data as boolean;
};
