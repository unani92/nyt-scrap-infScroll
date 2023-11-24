import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL } from 'lib/constants';

const axiosInstance = axios.create();
const http: HttpClient = axiosInstance;
http.defaults.baseURL = BASE_URL;

interface AxiosRequestConfigSetParamType<D> extends AxiosRequestConfig<D> {
  params?: D;
}

export interface HttpClient extends AxiosInstance {
  get<T = unknown, D = unknown>(url: string, config?: AxiosRequestConfigSetParamType<D>): Promise<T>;
}

export default http;

http.interceptors.response.use(res => res.data.response);
