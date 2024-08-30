import axios from 'axios';
import { useAuthStore } from '../stores';
const tcApi = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL
});

tcApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token ?? '';
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
);

export { tcApi };
