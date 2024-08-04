import MockAdapter from 'axios-mock-adapter';

import api from '../utils/network/api';
import * as RegistrationService from './registrations';

import { Registration } from '~/types';
import { Status } from '~/constants';

const apiMock = new MockAdapter(api);

const mockRegistration: Registration = {
  id: '1',
  employeeName: 'John Doe',
  email: 'john.doe@example.com',
  admissionDate: '2021-01-01',
  cpf: '63463971097',
  status: 'REVIEW',
};

describe('RegistrationService', () => {
  afterEach(() => {
    apiMock.reset();
  });

  it('should fetch registrations successfully', async () => {
    apiMock.onGet('/registrations').reply(200, [mockRegistration]);

    const registrations = await RegistrationService.get();

    expect(registrations).toEqual([mockRegistration]);
  });

  it('should fetch registration by CPF successfully', async () => {
    const cpf = '12345678900';
    apiMock.onGet(`/registrations?cpf=${cpf}`).reply(200, [mockRegistration]);

    const registrations = await RegistrationService.getByCPF(cpf);

    expect(registrations).toEqual([mockRegistration]);
  });

  it('should create a new registration successfully', async () => {
    const payload = {
      employeeName: 'John Doe',
      email: 'john.doe@example.com',
      admissionDate: '2021-01-01',
      cpf: '63463971097',
      status: Status.REVIEW,
    };
    apiMock.onPost('/registrations').reply(201, { id: '2', ...payload });

    const registration = await RegistrationService.create(payload);

    expect(registration).toEqual({ id: '2', ...payload });
  });

  it('should update a registration successfully', async () => {
    const updatedRegistration = {
      ...mockRegistration,
      status: Status.APPROVED,
    };
    apiMock
      .onPut(`/registrations/${mockRegistration.id}`)
      .reply(200, updatedRegistration);

    const registration = await RegistrationService.put(updatedRegistration);

    expect(registration).toEqual(updatedRegistration);
  });

  it('should remove a registration successfully', async () => {
    apiMock
      .onDelete(`/registrations/${mockRegistration.id}`)
      .reply(200, mockRegistration);

    const registration = await RegistrationService.remove(mockRegistration);

    expect(registration).toEqual(mockRegistration);
  });
});
