import api from '../utils/network/api';

import { Registration } from '~/types';

export const get = async () => {
  const response = await api.get<Registration[]>('/registrations');

  return response.data;
};

export const getByCPF = async (cpf: string) => {
  const response = await api.get<Registration[]>(`/registrations?cpf=${cpf}`);

  return response.data;
};

export const create = async (payload: Omit<Registration, 'id'>) => {
  console.log(payload);
  const response = await api.post('/registrations', payload);

  return response.data;
};

export const put = async (payload: Registration) => {
  const response = await api.put(`/registrations/${payload.id}`, payload);

  return response.data;
};

export const remove = async (payload: Registration) => {
  const response = await api.delete(`/registrations/${payload.id}`);

  return response.data;
};
