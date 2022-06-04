import { ColorDto } from '../../Types/Get/ColorDto';
import { CreateColorDto } from '../../Types/Post/CreataColorDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllColors = async (): Promise<ColorDto[]> => {
  const response = await axiosClient.get('Color/GetAll');
  return response.data as ColorDto[];
};

export const getColorById = async (id: number): Promise<ColorDto> => {
  const response = await axiosClient.get(`Color/GetById/${id}`);
  return response.data as ColorDto;
};

export const addColor = async (data: CreateColorDto): Promise<boolean> => {
  const response = await axiosClient.post('Color/Create', data);
  return response.data as boolean;
};

export const updateColor = async (data: CreateColorDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Color/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteColor = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Color/Delete/${id}`);
  return response.data as boolean;
};
