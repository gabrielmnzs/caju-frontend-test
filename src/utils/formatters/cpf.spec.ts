import { cpf } from './cpf';
import * as removeSpecialCharsModule from './remove-special-chars';

describe('cpf formatter', () => {
  let removeSpecialCharsSpy: jest.SpyInstance;

  beforeEach(() => {
    removeSpecialCharsSpy = jest.spyOn(
      removeSpecialCharsModule,
      'removeSpecialChars'
    );
    jest.clearAllMocks();
  });

  afterEach(() => {
    removeSpecialCharsSpy.mockRestore();
  });

  it('should format a CPF correctly', () => {
    removeSpecialCharsSpy.mockReturnValue('12345678901');

    expect(cpf('123.456.789-01')).toBe('123.456.789-01');
    expect(removeSpecialCharsSpy).toHaveBeenCalledWith('123.456.789-01');
  });

  it('should throw an error if CPF is empty or invalid', () => {
    removeSpecialCharsSpy.mockReturnValue('');

    expect(() => cpf('')).toThrow('cpf is empty or invalid');
    expect(removeSpecialCharsSpy).toHaveBeenCalledWith('');
  });

  it('should remove special characters from the input', () => {
    removeSpecialCharsSpy.mockReturnValue('12345678901');

    expect(cpf('123-456.789/01')).toBe('123.456.789-01');
    expect(removeSpecialCharsSpy).toHaveBeenCalledWith('123-456.789/01');
  });

  it('should format a CPF with more than 11 digits correctly', () => {
    removeSpecialCharsSpy.mockReturnValue('123456789012345');

    expect(cpf('123456789012345')).toBe('123.456.789-01');
    expect(removeSpecialCharsSpy).toHaveBeenCalledWith('123456789012345');
  });

  it('should format a CPF with less than 11 digits correctly', () => {
    removeSpecialCharsSpy.mockReturnValue('12345678');

    expect(cpf('12345678')).toBe('123.456.78');
    expect(removeSpecialCharsSpy).toHaveBeenCalledWith('12345678');
  });
});
