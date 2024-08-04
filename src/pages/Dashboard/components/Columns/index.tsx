import { Registration } from '~/types';
import { Status } from '~/constants';

import RegistrationCard from '../RegistrationCard';
import * as S from './styles';

const allColumns = [
  { status: Status.REVIEW, title: 'Pronto para revisar' },
  { status: Status.APPROVED, title: 'Aprovado' },
  { status: Status.REPROVED, title: 'Reprovado' },
];

interface ColumnsProps {
  registrations?: Registration[];
  onUpdate: () => void;
}

export const Collumns = ({ registrations, onUpdate }: ColumnsProps) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column $status={collum.status} key={collum.title}>
            <S.TitleColumn $status={collum.status}>
              {collum.title}
            </S.TitleColumn>
            <S.CollumContent>
              {registrations
                ?.filter(
                  (registration) => registration.status === collum.status
                )
                .map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                      onUpdate={onUpdate}
                    />
                  );
                })}
            </S.CollumContent>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
