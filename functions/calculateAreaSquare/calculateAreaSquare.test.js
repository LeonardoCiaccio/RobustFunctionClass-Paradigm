import { calculateAreaSquare, CCalculateAreaSquare } from './FCalculateAreaSquare';

describe('calculateAreaSquare', () => {
  // Test cases for successful calculations
  test('should calculate the area for a positive integer side', () => {
    const side = 5;
    const expectedArea = side * side;
    const result = calculateAreaSquare(side);
    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Area calculated successfully.');
    expect(result.result).toBeCloseTo(expectedArea);
  });

  test('should calculate the area for a positive decimal side', () => {
    const side = 2.5;
    const expectedArea = side * side;
    const result = calculateAreaSquare(side);
    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Area calculated successfully.');
    expect(result.result).toBeCloseTo(expectedArea);
  });

  test('should calculate the area for a very large side', () => {
    const side = 1000000;
    const expectedArea = side * side;
    const result = calculateAreaSquare(side);
    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Area calculated successfully.');
    expect(result.result).toBeCloseTo(expectedArea);
  });

  // Test cases for error handling (invalid arguments)
  test('should return an error if side is missing', () => {
    const result = calculateAreaSquare();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is not a number (string)', () => {
    const result = calculateAreaSquare('abc');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is not a number (boolean)', () => {
    const result = calculateAreaSquare(true);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is not a number (object)', () => {
    const result = calculateAreaSquare({});
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is not a number (array)', () => {
    const result = calculateAreaSquare([]);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is zero', () => {
    const result = calculateAreaSquare(0);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is negative', () => {
    const result = calculateAreaSquare(-5);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if side is NaN', () => {
    const result = calculateAreaSquare(NaN);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  // Test cases for CCalculateAreaSquare constructor validation
  test('CCalculateAreaSquare should return an error if required arguments are not an object', () => {
    const calculator = new CCalculateAreaSquare(null);
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: Required must be an object./);
    expect(result.result).toBeNull();
  });

  test('CCalculateAreaSquare should return an error if optional arguments are not an object', () => {
    const calculator = new CCalculateAreaSquare({ side: 1 }, null);
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: Optionals must be an object./);
    expect(result.result).toBeNull();
  });

  test('CCalculateAreaSquare should return an error if side property is missing in required', () => {
    const calculator = new CCalculateAreaSquare({});
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: Required must have a side property./);
    expect(result.result).toBeNull();
  });

  test('CCalculateAreaSquare should return an error if side is not a number in required', () => {
    const calculator = new CCalculateAreaSquare({ side: 'test' });
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('CCalculateAreaSquare should return an error if side is zero in required', () => {
    const calculator = new CCalculateAreaSquare({ side: 0 });
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('CCalculateAreaSquare should return an error if side is negative in required', () => {
    const calculator = new CCalculateAreaSquare({ side: -1 });
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('CCalculateAreaSquare should return an error if side is NaN in required', () => {
    const calculator = new CCalculateAreaSquare({ side: NaN });
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaSquare \| Validation error: The side must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });
});

// Mock CCalculateAreaSquare for testing its constructor validation (if needed, but already imported)
// class CCalculateAreaSquare { ... } // Not needed as it's imported from FCalculateAreaSquare.js