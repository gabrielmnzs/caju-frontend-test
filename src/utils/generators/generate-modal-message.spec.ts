import { generateModalMessage } from './generate-modal-message';
import { Action } from '~/constants';

describe('generateModalMessage', () => {
  it('should return the correct message for APPROVED action', () => {
    const action = Action.APPROVED;
    const expectedMessage = 'Você tem certeza que deseja aprovar este item?';

    expect(generateModalMessage(action)).toBe(expectedMessage);
  });

  it('should return the correct message for REPROVED action', () => {
    const action = Action.REPROVED;
    const expectedMessage = 'Você tem certeza que deseja reprovar este item?';

    expect(generateModalMessage(action)).toBe(expectedMessage);
  });

  it('should return the correct message for REVIEW action', () => {
    const action = Action.REVIEW;
    const expectedMessage =
      'Você tem certeza que deseja revisar novamente este item?';

    expect(generateModalMessage(action)).toBe(expectedMessage);
  });

  it('should return the correct message for DELETE action', () => {
    const action = Action.DELETE;
    const expectedMessage = 'Você tem certeza que deseja deletar este item?';
    expect(generateModalMessage(action)).toBe(expectedMessage);
  });

  it('should return the default message for an unknown action', () => {
    const action = 'UNKNOWN_ACTION';
    const expectedMessage = 'Você tem certeza que deseja realizar esta ação?';

    expect(generateModalMessage(action)).toBe(expectedMessage);
  });
});
