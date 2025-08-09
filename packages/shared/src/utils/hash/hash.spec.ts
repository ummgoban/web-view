import {to6DigitHash} from './hash';

describe('to6DigitHash', () => {
  it('should return a 6-digit hash', () => {
    const hash = to6DigitHash('test');
    expect(hash).toHaveLength(6);
  });
  it('should return the same hash for the same input', () => {
    const hash1 = to6DigitHash('test');
    const hash2 = to6DigitHash('test');
    expect(hash1).toBe(hash2);
  });
  it('should return different hashes for different inputs', () => {
    const TEST_COUNT = 10_000;
    const hashSet = new Set(Array.from({length: TEST_COUNT}, (_, i) => to6DigitHash(i.toString())));
    expect(hashSet.size).toBe(TEST_COUNT);
  });
});
