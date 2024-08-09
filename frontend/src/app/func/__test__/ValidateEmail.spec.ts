import { ValidateEmail } from "../ValidateEmail"

describe('ValidatePassword Test',() => {
  it("@가 없을 때", () => {
    const result = ValidateEmail('test22392183.com');
    expect(result).toBeFalsy();
  })

  it(". 이 없을 떄", () => {
    const result = ValidateEmail('teset320123@eeore');
    expect(result).toBeFalsy();
  })

  it("[@,.] 없을 떄", () => {
    const result = ValidateEmail('testtest');
    expect(result).toBeFalsy();
  })

  it("[@,.] 만 있을 떄", () => {
    const result = ValidateEmail('@.');
    expect(result).toBeFalsy();
  })

  it('조건에 맞을 때', () => {
    const result = ValidateEmail('222!!!a222#@test.com');
    expect(result).toBeTruthy();
  })
})