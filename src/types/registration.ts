import { Status } from '~/constants';

export type RegistrationStatus = keyof typeof Status;

export type Registration = {
  id: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
  admissionDate: string;
};
