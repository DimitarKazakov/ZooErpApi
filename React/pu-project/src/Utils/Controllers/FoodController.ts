import { getAxiosClient } from '../axiosClient';
import qs from 'qs';
import { FilterDto } from '../../Types/FilterDto';
import { FoodDto } from '../../Types/Get/FoodDto';
import { CreateFoodDto } from '../../Types/Post/CreateFoodDto';
import { FoodOptionsDto } from '../../Types/Get/FoodOptionsDto';

const axiosClient = getAxiosClient();

export const getAllFoods = async (filter?: FilterDto): Promise<FoodDto[]> => {
  const query = qs.stringify(filter);
  const response = await axiosClient.get(`Food/GetAll?${query}`);
  return response.data as FoodDto[];
};

export const addFood = async (data: CreateFoodDto): Promise<boolean> => {
  const response = await axiosClient.post('Food/Create', data);
  return response.data as boolean;
};

export const updateFood = async (data: CreateFoodDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Food/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteFood = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Food/Delete/${id}`);
  return response.data as boolean;
};

export const getFoodOptions = async (): Promise<FoodOptionsDto[]> => {
  const response = await axiosClient.get('Food/GetOptions');
  return response.data as FoodOptionsDto[];
};
