import axios from 'axios';

const apiUrl: string = import.meta.env
  .VITE_API_URL as string;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
})