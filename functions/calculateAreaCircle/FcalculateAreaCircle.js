
/**
 * CCalculateAreaCircle
 *
 * Robust, extensible class for calculating the area of a circle.
 * Encapsulates argument validation, environment preparation, business logic,
 * error handling, and standardized response formatting.
 *
 * Usage:
 *   const calculator = new CCalculateAreaCircle({ radius: 5 });
 *   const result = calculator.Action();
 *
 * The Action() method always returns an object:
 *   {
 *     isSuccess: boolean,
 *     message: string,
 *     result: number|null
 *   }
 */
class CCalculateAreaCircle {

    /**
     * Public property: class name
     * @type {string}
     */
    Name = 'CCalculateAreaCircle';

    /**
     * Private required arguments
     * @type {{ radius: number }}
     */
    #required = { radius: 0 };

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
     * Constructor for CCalculateAreaCircle
     * @param {object} required - Required arguments (must include radius: number)
     * @param {object} optionals - Optional arguments
     *
     * If validation fails, the instance is marked as not initialized and the error is stored in #response.
     */
    constructor(required = {}, optionals = {}) {
        try {
            this.#validateArgs(required, optionals);
            this.#required = required;
            this.#optionals = optionals;
            this.#prepareEnvironment();
            this.#initialized = true;
        } catch (error) {
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
            if (!required.hasOwnProperty('radius')) {
                throw new Error('Required must have a radius property.');
            }
            if (typeof required.radius !== 'number' || Number.isNaN(required.radius) || required.radius <= 0) {
                throw new Error('The radius must be a strictly positive number and not NaN.');
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
     * Core business logic: calculates the area of the circle
     * @returns {number}
     * @private
     */
    #businessLogic() {
        try {
            return Math.PI * this.#required.radius * this.#required.radius;
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
 * Functional wrapper for CCalculateAreaCircle.
 * Provides a simple function interface for calculating the area of a circle.
 *
 * @param {number} radius - The radius of the circle (must be strictly positive)
 * @returns {{ isSuccess: boolean, message: string, result: number|null }}
 */
export function calculateAreaCircle(radius) {
    return new CCalculateAreaCircle({ radius }).Action();
}
