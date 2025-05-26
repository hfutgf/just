import axios, { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosDefault = axios.create(options);
const axiosWithAuth = axios.create(options);

export { axiosDefault, axiosWithAuth };
