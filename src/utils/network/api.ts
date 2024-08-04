import axios from 'axios';

const api = axios.create({
  baseURL: String(process.env.VITE_BASE_URL || ''),
});

export default api;
