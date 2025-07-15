
/**
 * CFetchUrlAsync
 *
 * Robust, extensible async class for fetching the content of a web page.
 * Encapsulates argument validation, environment preparation, business logic,
 * error handling, and standardized response formatting.
 *
 * Usage:
 *   const fetcher = new CFetchUrlAsync({ url: 'https://example.com' });
 *   const result = await fetcher.Action();
 *
 * The Action() method always returns a Promise that resolves to an object:
 *   {
 *     isSuccess: boolean,
 *     message: string,
 *     result: string|null
 *   }
 */
class CFetchUrlAsync {

    /**
     * Public property: class name
     * @type {string}
     */
    Name = 'CFetchUrlAsync';

    /**
     * Private required arguments
     * @type {{ url: string }}
     */
    #required = { url: '' };

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
     * Constructor for CFetchUrl
     * @param {object} required - Required arguments (must include url: string)
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
            if (!required.hasOwnProperty('url')) {
                throw new Error('Required must have a url property.');
            }
            if (typeof required.url !== 'string' || !required.url.startsWith('http')) {
                throw new Error('The url must be a valid http(s) URL string.');
            }
        } catch (error) {
            throw new Error(`Validation error: ${error.message}`);
        }
    }

    /**
     * Prepares the environment for the fetch (placeholder for future use)
     * Extend this method to add environment setup logic as needed.
     * @private
     */
    #prepareEnvironment() {
        // Placeholder for future logic
    }

    /**
     * Core business logic: fetches the content of the web page
     * @returns {Promise<string>}
     * @private
     */
    async #businessLogic() {
        try {
            // Use fetch API (Node >=18 or with node-fetch polyfill)
            let response;
            try {
                response = await fetch(this.#required.url);
            } catch (err) {
                // Network error or DNS error
                throw new Error(`Network error or fetch failed: ${err.message}`);
            }
            if (!response || typeof response.status !== 'number') {
                throw new Error('No response or invalid response object');
            }
            if (!response.ok || response.status !== 200) {
                // Try to get status code and status text
                throw new Error(`HTTP error: status ${response.status} ${response.statusText || ''}`.trim());
            }
            const text = await response.text();
            return text;
        } catch (error) {
            throw new Error(`BusinessLogic error: ${error.message}`);
        }
    }

    /**
     * Executes the fetch and returns a standardized response object (Promise).
     * If initialization failed, returns the error response from the constructor.
     *
     * @returns {Promise<{ isSuccess: boolean, message: string, result: string|null }>}
     */
    async Action() {
        try {
            if (!this.#initialized) {
                return this.#response;
            }
            const result = await this.#businessLogic();
            this.#response.isSuccess = true;
            this.#response.message = 'Content fetched successfully.';
            this.#response.result = result;
            return this.#response;
        } catch (error) {
            this.#response.isSuccess = false;
            this.#response.message = `${this.Name} | ${error.message}`;
            this.#response.result = null;
            return this.#response;
        }
    }
}

/**
 * Functional async wrapper for CFetchUrl.
 * Provides a simple function interface for fetching a web page content.
 *
 * @param {string} url - The URL to fetch (must be a valid http(s) URL)
 * @returns {Promise<{ isSuccess: boolean, message: string, result: string|null }>}
 *
 * Example:
 *   const res = await fetchUrl('https://example.com');
 *   if (res.isSuccess) {
 *     console.log(res.result);
 *   } else {
 *     console.error(res.message);
 *   }
 */
export async function fetchUrlAsync(url) {
    return await new CFetchUrlAsync({ url }).Action();
}
