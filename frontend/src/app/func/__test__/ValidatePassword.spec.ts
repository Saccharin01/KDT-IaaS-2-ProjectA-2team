import { ValidatePassword } from "../ValidatePassword"

describe('ValidatePassword Test',() => {
  it("특수문자가 없을 때", () => {
    const result = ValidatePassword('test12345');
    expect(result).toBeFalsy();
  })

  it("8자 이하일 때", () => {
    const result = ValidatePassword('!test12');
    expect(result).toBeFalsy();
  })

  it("숫자가 없을 떄", () => {
    const result = ValidatePassword('!testtest');
    expect(result).toBeFalsy();
  })

  it('문자가 없을 때', () => {
    const result = ValidatePassword('!12341234');
    expect(result).toBeFalsy();
  })

  it('15자가 넘을 때', () => {
    const result = ValidatePassword('!eoreoi2223##$221@2@')
    expect(result).toBeFalsy();
  })

  it('조건에 맞을 때', () => {
    const result = ValidatePassword('222!!!a222#');
    expect(result).toBeTruthy();
  })
})