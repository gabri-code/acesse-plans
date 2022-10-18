import axios from 'axios';
import { parseCookies } from 'nookies';

export const getApiClient = (ctx?: any) => {
  const { 'acesse-token': token } = parseCookies(ctx);

  const client = axios.create({
    baseURL: 'http://localhost:3001',
  });

  client.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  if (token) {
    client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return client;
};
