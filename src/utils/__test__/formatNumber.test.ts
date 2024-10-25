import { formatNumberWithUnit } from '../formatNumber';

describe('Format number utils test cases', () => {
  it('should format numbers with compact notation and append a singular unit', () => {
    expect(formatNumberWithUnit(1, 'item')).toBe('1 item');
    expect(formatNumberWithUnit(1, 'user')).toBe('1 user');
  });

  it('should format numbers with compact notation and append a plural unit', () => {
    expect(formatNumberWithUnit(1200, 'item')).toBe('1,2K items');
    expect(formatNumberWithUnit(1500000, 'user')).toBe('1,5M users');
  });

  it('should format numbers without appending a unit if none is provided', () => {
    expect(formatNumberWithUnit(1200)).toBe('1,2K ');
    expect(formatNumberWithUnit(1500000)).toBe('1,5M ');
  });

  it('should handle large numbers properly', () => {
    expect(formatNumberWithUnit(1000000000, 'user')).toBe('1B users');
    expect(formatNumberWithUnit(2500000000, 'item')).toBe('2,5B items');
  });

  it('should handle negative numbers', () => {
    expect(formatNumberWithUnit(-1500000, 'user')).toBe('-1,5M users');
    expect(formatNumberWithUnit(-1, 'item')).toBe('-1 item');
  });

  it('should handle zero as a number and keep the unit singular', () => {
    expect(formatNumberWithUnit(0, 'item')).toBe('0 item');
    expect(formatNumberWithUnit(0, 'user')).toBe('0 user');
  });
});
