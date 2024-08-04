import { isValidCPF, strip } from './cpf-validation';

describe('CPF', () => {
  it("should get invalid CNPJ, because it's blacklist", () => {
    expect(isValidCPF('00000000000')).toBeFalsy();
    expect(isValidCPF('11111111111')).toBeFalsy();
    expect(isValidCPF('22222222222')).toBeFalsy();
    expect(isValidCPF('33333333333')).toBeFalsy();
    expect(isValidCPF('44444444444')).toBeFalsy();
    expect(isValidCPF('55555555555')).toBeFalsy();
    expect(isValidCPF('66666666666')).toBeFalsy();
    expect(isValidCPF('77777777777')).toBeFalsy();
    expect(isValidCPF('88888888888')).toBeFalsy();
    expect(isValidCPF('99999999999')).toBeFalsy();
    expect(isValidCPF('12345678909')).toBeFalsy();
  });

  it("should get invalid return, because it's not a valid value", () => {
    expect(isValidCPF('')).toBeFalsy();
  });

  it('should return a formatted number', () => {
    expect(isValidCPF('295.379.955-93')).toBeTruthy();
  });

  it('should return an unformatted number', () => {
    expect(isValidCPF('29537995593')).toBeTruthy();
  });

  it('should validate confused strings', () => {
    expect(isValidCPF('295$379\n955...93')).toBeTruthy();
  });

  it('should validate sequences of characteres', () => {
    expect(isValidCPF('295$379\n955...93', true)).toBeFalsy();
    expect(isValidCPF('295.379.955-93', true)).toBeTruthy();
    expect(isValidCPF('29537995593', true)).toBeTruthy();
  });

  it('should return an unformatted number', () => {
    const number = strip('295.379.955-93');
    expect(number).toEqual('29537995593');
  });
});
