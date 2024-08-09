import { ValidatePhoneNumber } from "../ValidatePhoneNumber"

describe('ValidatePassword Test',() => {
  it("-가 없을 때", () => {
    const result = ValidatePhoneNumber('0100002345');
    expect(result).toBeFalsy();
  })

  it("앞자리가 이상한 숫자일 때", () => {
    const result = ValidatePhoneNumber('999-0000-0000');
    expect(result).toBeFalsy();
  })

  it("앞자리가 3자리 이상일 때 숫자일 때", () => {
    const result = ValidatePhoneNumber('0106-0000-0000');
    expect(result).toBeFalsy();
  })

  it("중간숫자가 5자리 넘어갈 때", () => {
    const result = ValidatePhoneNumber('010-00000-0000');
    expect(result).toBeFalsy();
  })

  it('중간숫자가 2자리 이하일 때', () => {
    const result = ValidatePhoneNumber('010-00-0000');
    expect(result).toBeFalsy();
  })

  it('뒷 자리가 5자리 이상일 때', () => {
    const result = ValidatePhoneNumber('010-000-00000')
    expect(result).toBeFalsy();
  })

  it('뒷 자리가 3자리 이하일 때', () => {
    const result = ValidatePhoneNumber('010-000-000');
    expect(result).toBeFalsy();
  })

  it('맞는 번호일 때', () => {
    const result =  ValidatePhoneNumber('010-0000-0000');
    expect(result).toBeTruthy();
  })
})