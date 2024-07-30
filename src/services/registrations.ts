import api from '../utils/axios';

import { Registration } from '~/types';

export const get = async () => {
  const response = await api.get<Registration[]>('/registrations');

  return response.data;
};
