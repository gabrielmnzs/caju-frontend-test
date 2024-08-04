import { removeSpecialChars } from './remove-special-chars';

describe('removeSpecialChars', () => {
  it('should remove special characters from a string with mixed characters', () => {
    const input = 'abc123!@#';
    const expectedOutput = '123';
    expect(removeSpecialChars(input)).toBe(expectedOutput);
  });

  it('should return the same string if there are no special characters', () => {
    const input = '123456';
    const expectedOutput = '123456';
    expect(removeSpecialChars(input)).toBe(expectedOutput);
  });

  it('should return an empty string if the input is an empty string', () => {
    const input = '';
    const expectedOutput = '';
    expect(removeSpecialChars(input)).toBe(expectedOutput);
  });

  it('should return an empty string if the input contains only special characters', () => {
    const input = '!@#$%^&*()';
    const expectedOutput = '';
    expect(removeSpecialChars(input)).toBe(expectedOutput);
  });

  it('should remove spaces from the string', () => {
    const input = '1 2 3 4 5';
    const expectedOutput = '12345';
    expect(removeSpecialChars(input)).toBe(expectedOutput);
  });

  it('should remove special characters from a string with only alphabetic characters and special characters', () => {
    const input = 'abc!@#def';
    const expectedOutput = '';
    expect(removeSpecialChars(input)).toBe(expectedOutput);
  });
});
