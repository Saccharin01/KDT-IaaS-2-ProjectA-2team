import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.PROXY_SERVICE_HOST || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;