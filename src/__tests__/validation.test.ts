
import { isValidNumber } from '../utils/validation';

describe('isValidNumber', () => {
  it('accepts integers and decimals', () => {
    expect(isValidNumber('100')).toBe(true);
    expect(isValidNumber('100.50')).toBe(true);
  });
  it('rejects invalid formats', () => {
    expect(isValidNumber('100.0.0')).toBe(false);
    expect(isValidNumber('abc')).toBe(false);
    expect(isValidNumber(' ')).toBe(false);
  });
});
