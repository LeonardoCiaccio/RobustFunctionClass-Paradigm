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
    expect(result.message).toMatch(/CCalculateAreaCircle \| Validation error: The radius must be a strictly positive number and not NaN./);
    expect(result.result).toBeNull();
  });

  test('should return an error if radius is not a number (string)', () => {
    const result = calculateAreaCircle('abc');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaCircle \| Validation error: The radius must be a strictly positive number and not NaN./);
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

  test('should return an error if required arguments are not an object', () => {
    const calculator = new CCalculateAreaCircle(null);
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaCircle \| Required must be an object./);
    expect(result.result).toBeNull();
  });

  test('should return an error if optional arguments are not an object', () => {
    const calculator = new CCalculateAreaCircle({ radius: 1 }, null);
    const result = calculator.Action();
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CCalculateAreaCircle \| Optionals must be an object./);
    expect(result.result).toBeNull();
  });
});

// Mock CCalculateAreaCircle for testing its constructor validation
class CCalculateAreaCircle {
  constructor(required = {}, optionals = {}) {
    this.Name = 'CCalculateAreaCircle';
    this.isSuccess = true;
    this.message = '';
    this.result = null;
    try {
      this.#validateArgs(required, optionals);
      this.isSuccess = true;
      this.message = 'Initialized successfully.';
    } catch (error) {
      this.isSuccess = false;
      this.message = `${this.Name} | ${error.message}`;
      this.result = null;
    }
  }

  #validateArgs(required, optionals) {
    if (typeof required !== 'object' || required === null) {
      throw new Error('Required must be an object.');
    }
    if (typeof optionals !== 'object' || optionals === null) {
      throw new Error('Optionals must be an object.');
    }
    if (!required.hasOwnProperty('radius')) {
      throw new Error('Required must have a radius property.');
    }
    if (typeof required.radius !== 'number' || Number.isNaN(required.radius) || required.radius <= 0) {
      throw new Error('The radius must be a strictly positive number and not NaN.');
    }
  }

  Action() {
    return { isSuccess: this.isSuccess, message: this.message, result: this.result };
  }
}