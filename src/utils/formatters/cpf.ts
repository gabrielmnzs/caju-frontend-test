import { removeSpecialChars } from './remove-special-chars';

export const cpf = (value: string) => {
  const sanitized = removeSpecialChars(value);

  if (!sanitized) throw new Error('cpf is empty or invalid');

  return sanitized
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};
