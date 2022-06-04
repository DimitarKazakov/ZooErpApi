export interface EnvironmentConfig {
  api_url: string;
}

export const appConfig: EnvironmentConfig = {
  api_url: process.env.REACT_APP_API_URL || '',
};
