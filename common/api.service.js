import axios from 'axios';
import config from './config';

export const HTTP = axios.create({
  baseURL: config.apiUrl,
});
