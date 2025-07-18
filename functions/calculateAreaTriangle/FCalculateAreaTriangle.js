/**
 * CCalculateAreaTriangle
 *
 * Robust, extensible class for calculating the area of a triangle.
 * Encapsulates argument validation, environment preparation, business logic,
 * error handling, and standardized response formatting.
 *
 * Usage:
 *   const calculator = new CCalculateAreaTriangle({ base: 5, height: 3 });
 *   const result = calculator.Action();
 *
 * The Action() method always returns an object:
 *   {
 *     isSuccess: boolean,
 *     message: string,
 *     result: number|null
 *   }
 */
class CCalculateAreaTriangle {

    /**
     * Public property: class name
     * @type {string}
     */
    Name = 'CCalculateAreaTriangle';

    /**
     * Private required arguments
     * @type {{ base: number, height: number }}
     */
    #required = { base: 0, height: 0 };

    /**
     * Private optional arguments
     * @type {object}
     */
    #optionals = {};

    /**
     * Private response object (used for error reporting if initialization fails)
     * @type {{ isSuccess: boolean, message: string, result: any }}
     */
    #response = {
        isSuccess: false,
        message: '',
        result: null
    };

    /**
     * Private initialization flag
     * @type {boolean}
     */
    #initialized = false;

    /**
     * Constructor for CCalculateAreaTriangle
     * @param {object} required - Required arguments (must include base: number, height: number)
     * @param {object} optionals - Optional arguments
     *
     * If validation fails, the instance is marked as not initialized and the error is stored in #response.
     */
    constructor(required = {}, optionals = {}) {
        try {
            // Validate arguments
            this.#validateArgs(required, optionals);
            // Assign validated arguments to private properties
            this.#required = required;
            this.#optionals = optionals;
            // Prepare environment (placeholder for future logic)
            this.#prepareEnvironment();
            this.#initialized = true;
        } catch (error) {
            // Store error details for later retrieval in Action()
            this.#response.isSuccess = false;
            this.#response.message = `${this.Name} | ${error.message}`;
            this.#response.result = null;
        }
    }

    // Private methods

    /**
     * Validates required and optional arguments
     * @param {object} required
     * @param {object} optionals
     * @throws {Error} If validation fails
     */
    #validateArgs(required, optionals) {
        try {
            if (typeof required !== 'object' || required === null) {
                throw new Error('Required must be an object.');
            }
            if (typeof optionals !== 'object' || optionals === null) {
                throw new Error('Optionals must be an object.');
            }
            if (!required.hasOwnProperty('base')) {
                throw new Error('Required must have a base property.');
            }
            if (!required.hasOwnProperty('height')) {
                throw new Error('Required must have a height property.');
            }
            // Check if base and height are numbers, not NaN, and strictly positive
            if (typeof required.base !== 'number' || Number.isNaN(required.base) || required.base <= 0) {
                throw new Error('The base must be a strictly positive number and not NaN.');
            }
            if (typeof required.height !== 'number' || Number.isNaN(required.height) || required.height <= 0) {
                throw new Error('The height must be a strictly positive number and not NaN.');
            }
        } catch (error) {
            throw new Error(`Validation error: ${error.message}`);
        }
    }

    /**
     * Prepares the environment for the calculation (placeholder for future use)
     * Extend this method to add environment setup logic as needed.
     * @private
     */
    #prepareEnvironment() {
        try {
            // TODO: Prepare the environment for the calculation
        } catch (error) {
            throw new Error(`Preparing environment error: ${error.message}`);
        }
    }

    /**
     * Core business logic: calculates the area of the triangle
     * @returns {number}
     * @private
     */
    #businessLogic() {
        try {
            return (this.#required.base * this.#required.height) / 2;
        } catch (error) {
            throw new Error(`BusinessLogic error: ${error.message}`);
        }
    }

    /**
     * Executes the calculation and returns a standardized response object.
     * If initialization failed, returns the error response from the constructor.
     *
     * @returns {{ isSuccess: boolean, message: string, result: number|null }}
     */
    Action() {
        try {
            if (!this.#initialized) {
                return this.#response;
            }
            // Execute business logic
            const result = this.#businessLogic();
            this.#response.isSuccess = true;
            this.#response.message = 'Area calculated successfully.';
            this.#response.result = result;
            return this.#response;
        } catch (error) {
            this.#response.isSuccess = false;
            this.#response.message = `${this.Name} | ${error.message}`;
            this.#response.result = null;
            return this.#response;
        }
    }

};

/**
 * Functional wrapper for CCalculateAreaTriangle.
 * Provides a simple function interface for calculating the area of a triangle.
 *
 * @param {number} base - The length of the triangle's base (must be strictly positive)
 * @param {number} height - The height of the triangle (must be strictly positive)
 * @returns {{ isSuccess: boolean, message: string, result: number|null }}
 */
export function calculateAreaTriangle(base, height) {
    return new CCalculateAreaTriangle({ base, height }).Action();
}