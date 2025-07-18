import { calculateAreaCircle } from './FcalculateAreaCircle';

describe('calculateAreaCircle', () => {
  // Test cases for successful calculations
  test('should calculate the area for a positive integer radius', () => {
    const radius = 5;
    const expectedArea = Math.PI * radius * radius;
    const result = calculateAreaCircle(radius);
    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Area calculated successfully.');
    expect(result.result).toBeCloseTo(expectedArea);
  });

  test('should calculate the area for a positive decimal radius', () => {
    const radius = 2.5;
    const expectedArea = Math.PI * radius * radius;
    const result = calculateAreaCircle(radius);
    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Area calculated successfully.');
    expect(result.result).toBeCloseTo(expectedArea);
  });

  test('should calculate the area for a very large radius', () => {
    const radius = 1000000;
    const expectedArea = Math.PI * radius * radius;
    const result = calculateAreaCircle(radius);
    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Area calculated successfully.');
    expect(result.result).toBeCloseTo(expectedArea);
  });

  // Test cases for error handling (invalid arguments)
  test('should return an error if radius is missing', () => {
    const result = calculateAreaCircle();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is not a number (string)', () => {
    const result = calculateAreaCircle('abc');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is not a number (boolean)', () => {
    const result = calculateAreaCircle(true);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is not a number (object)', () => {
    const result = calculateAreaCircle({});
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is not a number (array)', () => {
    const result = calculateAreaCircle([]);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is zero', () => {
    const result = calculateAreaCircle(0);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is negative', () => {
    const result = calculateAreaCircle(-5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is NaN', () => {
    const result = calculateAreaCircle(NaN);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });
});