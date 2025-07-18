

/**
 * CCalculateAreaSquare
 *
 * Robust, extensible class for calculating the area of a square.
 * Encapsulates argument validation, environment preparation, business logic,
 * error handling, and standardized response formatting.
 *
 * Usage:
 *   const calculator = new CCalculateAreaSquare({ side: 5 });
 *   const result = calculator.Action();
 *
 * The Action() method always returns an object:
 *   {
 *     isSuccess: boolean,
 *     message: string,
 *     result: number|null
 *   }
 *
 * This paradigm is designed for public, reusable, and testable business logic modules.
 */
class CCalculateAreaSquare {


    /**
     * Public property: class name
     * @type {string}
     */
    Name = 'CCalculateAreaSquare';


    /**
     * Private required arguments
     * @type {{ side: number }}
     */
    #required = { side: 0 };


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
     * Constructor for CCalculateAreaSquare
     * @param {object} required - Required arguments (must include side: number)
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
            if (!required.hasOwnProperty('side')) {
                throw new Error('Required must have a side property.');
            }
            // Check if side is a number, not NaN, and strictly positive
            if (typeof required.side !== 'number' || Number.isNaN(required.side) || required.side <= 0) {
                throw new Error('The side must be a strictly positive number and not NaN.');
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
     * Core business logic: calculates the area of the square
     * @returns {number}
     * @private
     */
    #businessLogic() {
        try {
            return this.#required.side * this.#required.side;
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
 * Functional wrapper for CCalculateAreaSquare.
 * Provides a simple function interface for calculating the area of a square.
 *
 * @param {number} side - The length of the square's side (must be strictly positive)
 * @returns {{ isSuccess: boolean, message: string, result: number|null }}
 */
export function calculateAreaSquare(side) {
    return new CCalculateAreaSquare({ side }).Action();
}