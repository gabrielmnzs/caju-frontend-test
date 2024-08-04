import axios from 'axios';

const api = axios.create({
  baseURL: String(import.meta.env.VITE_BASE_URL || ''),
});

export default api;
