export enum RegistrationStatus {
  REVIEW = 'REVIEW',
  APPROVED = 'APROVED',
  REPROVED = 'REPROVED',
}

export type Registration = {
  id: number;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
  admissionDate: string;
};
