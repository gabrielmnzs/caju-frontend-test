import { Action } from '~/constants';

export const generateModalMessage = (action: string): string => {
  switch (action) {
    case Action.APPROVED:
      return 'Você tem certeza que deseja aprovar este item?';
    case Action.REPROVED:
      return 'Você tem certeza que deseja reprovar este item?';
    case Action.REVIEW:
      return 'Você tem certeza que deseja revisar novamente este item?';
    case Action.DELETE:
      return 'Você tem certeza que deseja deletar este item?';
    default:
      return 'Você tem certeza que deseja realizar esta ação?';
  }
};
