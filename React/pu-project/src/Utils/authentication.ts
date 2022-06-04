import axios from 'axios';
import { notification } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { LoginRequest } from '../Types/LoginRequest';
import { appConfig } from '../config/app.config';

interface KeycloakResponse {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  scope: string;
  sessionState: string;
  tokenType: string;
  error: string;
  errorDescription: string;
}

interface KeycloakJwt {
  user_roles?: string[];
}

export const getToken = (): string | null => localStorage.getItem('token');

export const getUserRoles = (): string[] => localStorage.getItem('roles')?.split(',') || [];

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return token !== null;
};

export const onLogInError = (message: string) => notification.error({ message });

export const onLogInSuccess = (history: NavigateFunction, username: string) => {
  notification.success({ message: `Welcome ${username}` });
  history('/');
};

const onLogOutSuccess = (history: NavigateFunction) => {
  history('/login');
  notification.error({ message: 'You have been logged out' });
};

export const logIn = async (data: LoginRequest, history: NavigateFunction) => {
  const response = await axios.post(`${appConfig.api_url}/Authentication/LogIn`, data, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const content = (await response.data) as KeycloakResponse;
  if (content.error) {
    onLogInError(content.errorDescription ?? content.error);
  } else if (content.accessToken) {
    const decodedToken = jwt_decode(content.accessToken) as KeycloakJwt;
    if (decodedToken.user_roles) {
      localStorage.setItem('roles', decodedToken.user_roles.join(','));
    }

    localStorage.setItem('token', content.accessToken);
    localStorage.setItem('refresh', content.refreshToken);
    onLogInSuccess(history, data.username);
  }
};

export const logOut = (history: NavigateFunction) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  localStorage.removeItem('roles');
  onLogOutSuccess(history);
};
