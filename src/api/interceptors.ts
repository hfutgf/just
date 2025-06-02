import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookie from 'js-cookie';

type TokenType = 'auth_token' | 'access_token';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

const createDefaultConfig = (): CreateAxiosDefaults => ({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const createAxiosInstance = (config?: CreateAxiosDefaults): AxiosInstance => {
  const instance = axios.create(config);

  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => response,
    (error: AxiosError<ApiResponse>) => {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401:
            console.error('Authorization error:', data.message || 'Unauthorized');
            break;
          case 403:
            console.error('Access denied:', data.message || 'Forbidden');
            break;
          case 404:
            console.error('Resource not found:', data.message || 'Not Found');
            break;
          case 500:
            console.error('Server error:', data.message || 'Internal Server Error');
            break;
          default:
            console.error('Error:', data.message || 'An error occurred');
        }
      } else if (error.request) {
        console.error('No response from server:', error.message);
      } else {
        console.error('Request setup error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const addTokenInterceptor = (instance: AxiosInstance, tokenType: TokenType): AxiosInstance => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = Cookie.get(tokenType);
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

const axiosDefault = createAxiosInstance(createDefaultConfig());
const axiosAdminApi = addTokenInterceptor(createAxiosInstance(createDefaultConfig()), 'auth_token');
const axiosUserApi = addTokenInterceptor(
  createAxiosInstance(createDefaultConfig()),
  'access_token'
);

export { axiosDefault, axiosAdminApi, axiosUserApi };
