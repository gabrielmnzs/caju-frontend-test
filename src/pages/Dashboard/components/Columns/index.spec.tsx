import { render, fireEvent } from '@testing-library/react';
import { Columns } from '.';
import { Registration } from '~/types';
import { Status } from '~/constants';

jest.mock('../RegistrationCard', () => ({
  RegistrationCard: jest.fn(({ data, onUpdate }) => (
    <div>
      <p>{data.employeeName}</p>
      <button onClick={onUpdate}>Update</button>
    </div>
  )),
}));

const mockRegistrations: Registration[] = [
  {
    id: '1',
    admissionDate: '01/01/2024',
    employeeName: 'John Doe',
    email: 'john@email.com',
    cpf: '70932936032',
    status: Status.REVIEW,
  },
  {
    id: '2',
    admissionDate: '01/01/2024',
    employeeName: 'Jane Smith',
    email: 'jane@email.com',
    cpf: '44764335026',
    status: Status.APPROVED,
  },
  {
    id: '3',
    admissionDate: '01/01/2024',
    employeeName: 'Bob Johnson',
    email: 'bob@email.com',
    cpf: '00280005016',
    status: Status.REPROVED,
  },
];

describe('Columns Component', () => {
  it('should render columns with correct titles', () => {
    const { getByText } = render(
      <Columns registrations={mockRegistrations} onUpdate={jest.fn()} />
    );
    expect(getByText('Pronto para revisar')).toBeInTheDocument();
    expect(getByText('Aprovado')).toBeInTheDocument();
    expect(getByText('Reprovado')).toBeInTheDocument();
  });

  it('should render registrations in the correct columns', () => {
    const { getByText } = render(
      <Columns registrations={mockRegistrations} onUpdate={jest.fn()} />
    );
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Smith')).toBeInTheDocument();
    expect(getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('should call onUpdate when the update button is clicked', () => {
    const mockOnUpdate = jest.fn();
    const { getAllByText } = render(
      <Columns registrations={mockRegistrations} onUpdate={mockOnUpdate} />
    );
    const updateButtons = getAllByText('Update');
    fireEvent.click(updateButtons[0]);
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
  });

  it('should have correct styles applied', () => {
    const { getByText } = render(
      <Columns registrations={mockRegistrations} onUpdate={jest.fn()} />
    );
    const reviewColumn = getByText('Pronto para revisar').parentElement;
    const approvedColumn = getByText('Aprovado').parentElement;
    const reprovedColumn = getByText('Reprovado').parentElement;
    expect(reviewColumn).toHaveStyleRule('background-color', '#FDF8E9');
    expect(approvedColumn).toHaveStyleRule('background-color', '#EEEEFD');
    expect(reprovedColumn).toHaveStyleRule('background-color', '#FBEDF6');
  });
});
