import { ConditionDto } from '../../Types/Get/ConditionDto';
import { CreateConditionDto } from '../../Types/Post/CreateConditionDto';
import { getAxiosClient } from '../axiosClient';

const axiosClient = getAxiosClient();

export const getAllConditions = async (): Promise<ConditionDto[]> => {
  const response = await axiosClient.get('Condition/GetAll');
  return response.data as ConditionDto[];
};

export const getConditionById = async (id: number): Promise<ConditionDto> => {
  const response = await axiosClient.get(`Condition/GetById/${id}`);
  return response.data as ConditionDto;
};

export const addCondition = async (data: CreateConditionDto): Promise<boolean> => {
  const response = await axiosClient.post('Condition/Create', data);
  return response.data as boolean;
};

export const updateCondition = async (data: CreateConditionDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Condition/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteCondition = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Condition/Delete/${id}`);
  return response.data as boolean;
};
