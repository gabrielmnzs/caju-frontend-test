import { z } from 'zod';
import { isValidCPF } from '~/utils';

export const newRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome obrigatório')
    .refine(
      (name) => {
        const regex = /^(?!\d)[A-Za-zÀ-ÖØ-öø-ÿ]+\s[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
        return regex.test(name);
      },
      {
        message:
          'O nome deve ter pelo menos um espaço, duas letras e a primeira letra não pode ser um número',
      }
    ),
  email: z
    .string()
    .min(1, 'Email obrigatório')
    .email('Digite um e-mail válido'),
  document: z.string().min(1, 'CPF obrigatório').refine(isValidCPF, {
    message: 'Digite um CPF válido',
  }),
  date: z
    .string()
    .date('Insira uma data válida')
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        const dateObject = new Date(parsedDate);
        return (
          !isNaN(parsedDate) && dateObject.toISOString().slice(0, 10) === date
        );
      },
      {
        message: 'Insira uma data válida',
      }
    ),
});
