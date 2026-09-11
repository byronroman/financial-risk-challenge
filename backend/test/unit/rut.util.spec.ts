import {
  calculateCheckDigit,
  formatRut,
  isValidRut,
  normalizeRut,
} from '../../src/common/utils/rut.util';

describe('RUT utilities', () => {
  describe('normalizeRut', () => {
    it('should remove dots and hyphen', () => {
      expect(normalizeRut('12.345.678-5')).toBe('123456785');
    });

    it('should convert K to uppercase', () => {
      expect(normalizeRut('1.234.567-k')).toBe('1234567K');
    });
  });

  describe('calculateCheckDigit', () => {
    it('should calculate the correct check digit', () => {
      expect(calculateCheckDigit('12345678')).toBe('5');
    });
  });

  describe('isValidRut', () => {
    it('should accept a valid RUT', () => {
      expect(isValidRut('12.345.678-5')).toBe(true);
    });

    it('should reject an invalid RUT', () => {
      expect(isValidRut('12.345.678-9')).toBe(false);
    });
  });

  describe('formatRut', () => {
    it('should format a normalized RUT', () => {
      expect(formatRut('123456785')).toBe('12.345.678-5');
    });
  });
});
