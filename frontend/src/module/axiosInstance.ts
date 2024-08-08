import axios from 'axios';
import {HTTP} from '../static/HTTP'

const axiosInstance = axios.create({
  baseURL: HTTP.HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;