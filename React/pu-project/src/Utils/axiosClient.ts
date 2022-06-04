import axios from 'axios';
import { appConfig } from '../config/app.config';
import { getToken } from './authentication';

export const getAxiosClient = () => {
  return axios.create({
    baseURL: appConfig.api_url,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
