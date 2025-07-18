import { calculateAreaTriangle, CCalculateAreaTriangle } from './FCalculateAreaTriangle';

describe('calculateAreaTriangle', () => {
  // Success cases for calculateAreaTriangle function
  test('should calculate the area of a triangle with positive integer base and height', () => {
    const result = calculateAreaTriangle(10, 5);
    expect(result.isSuccess).toBe(true);
    expect(result.result).toBe(25);
    expect(result.message).toBe('Area calculated successfully.');
  });

  test('should calculate the area of a triangle with decimal base and height', () => {
    const result = calculateAreaTriangle(7.5, 4.2);
    expect(result.isSuccess).toBe(true);
    expect(result.result).toBeCloseTo(15.75);
    expect(result.message).toBe('Area calculated successfully.');
  });

  test('should calculate the area of a triangle with large base and height', () => {
    const result = calculateAreaTriangle(1000000, 2000000);
    expect(result.isSuccess).toBe(true);
    expect(result.result).toBe(1000000000000);
    expect(result.message).toBe('Area calculated successfully.');
  });

  // Error cases for calculateAreaTriangle function
  test('should return an error if base is missing', () => {
    const result = calculateAreaTriangle(undefined, 5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The base must be a strictly positive number and not NaN./);
  });

  test('should return an error if height is missing', () => {
    const result = calculateAreaTriangle(10, undefined);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The height must be a strictly positive number and not NaN./);
  });

  test('should return an error if base is not a number', () => {
    const result = calculateAreaTriangle('abc', 5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The base must be a strictly positive number and not NaN./);
  });

  test('should return an error if height is not a number', () => {
    const result = calculateAreaTriangle(10, 'xyz');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The height must be a strictly positive number and not NaN./);
  });

  test('should return an error if base is zero', () => {
    const result = calculateAreaTriangle(0, 5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The base must be a strictly positive number and not NaN./);
  });

  test('should return an error if height is zero', () => {
    const result = calculateAreaTriangle(10, 0);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The height must be a strictly positive number and not NaN./);
  });

  test('should return an error if base is negative', () => {
    const result = calculateAreaTriangle(-10, 5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The base must be a strictly positive number and not NaN./);
  });

  test('should return an error if height is negative', () => {
    const result = calculateAreaTriangle(10, -5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The height must be a strictly positive number and not NaN./);
  });

  test('should return an error if base is NaN', () => {
    const result = calculateAreaTriangle(NaN, 5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The base must be a strictly positive number and not NaN./);
  });

  test('should return an error if height is NaN', () => {
    const result = calculateAreaTriangle(10, NaN);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/Validation error: The height must be a strictly positive number and not NaN./);
  });
});