const expect = require('expect');
const { describe, it } = require('mocha');

const { isRealString } = require('./validation');


describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(true))
      .toBeA('boolean')
      .toBe(false);
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('    '))
      .toBeA('boolean')
      .toBe(false);
  });

  it('sould allow string with non-space characters', () => {
    expect(isRealString('  Valid string'))
      .toBeA('boolean')
      .toBe(true);
  });
})
