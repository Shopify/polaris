/* eslint-disable no-console */

/**
 * Retry - Retry a function on failure
 *
 * @param {function} Run          - The function to retry on failure
 * @param {string}   errorMessage - Additional information when the limit is reached
 * @param {number}   attempts     - The total number of attempts
 * @param {number}   limit        - The maximum number of attempts
 * @param {number}   delay        - The seconds to wait between attempts
 */
const Retry = function(Run, errorMessage, attempts = 0, limit = 3, delay = 10) {
  // Check that there is a function to try
  if (typeof Run !== 'function') {
    console.error('Retry must have a function to run and retry on failure');
    return;
  }

  let currentAttempts = attempts;

  // Try the function
  try {
    // Check if we are at maximum attempts
    if (attempts < limit) {
      currentAttempts += 1;

      // Try the function
      Run();
    }
    // Catch any errors
  } catch (error) {
    // If we are at maximum
    if (attempts === limit) {
      const message = errorMessage ? `${error}\n\n${errorMessage}` : error;
      console.error(message);
    } else {
      // Otherwise try again after a delay
      setTimeout(() => {
        Retry(Run, errorMessage, currentAttempts, limit, delay);
      }, delay * 1000);
    }
  }
};

module.exports.default = Retry;
