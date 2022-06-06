import { getAxiosClient } from '../axiosClient';
import qs from 'qs';
import { FilterDto } from '../../Types/FilterDto';
import { EventDto } from '../../Types/Get/EventDto';
import { CreateEventDto } from '../../Types/Post/CreateEventDto';
import { EventOptionsDto } from '../../Types/Get/EventOptionsDto';

const axiosClient = getAxiosClient();

export const getAllEvents = async (filter?: FilterDto): Promise<EventDto[]> => {
  const query = qs.stringify(filter);
  const response = await axiosClient.get(`Event/GetAll?${query}`);
  return response.data as EventDto[];
};

export const addEvent = async (data: CreateEventDto): Promise<boolean> => {
  const response = await axiosClient.post('Event/Create', data);
  return response.data as boolean;
};

export const updateEvent = async (data: CreateEventDto, id: number): Promise<boolean> => {
  const response = await axiosClient.put(`Event/Update/${id}`, data);
  return response.data as boolean;
};

export const deleteEvent = async (id: number): Promise<boolean> => {
  const response = await axiosClient.delete(`Event/Delete/${id}`);
  return response.data as boolean;
};

export const getEventOptions = async (): Promise<EventOptionsDto[]> => {
  const response = await axiosClient.get('Event/GetOptions');
  return response.data as EventOptionsDto[];
};
