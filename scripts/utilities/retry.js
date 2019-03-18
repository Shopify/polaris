function retry(functionToTry, maxAttempts = 3, delay = 1000) {
  try {
    functionToTry();
  } catch (error) {
    const remainingAttempts = maxAttempts - 1;
    if (remainingAttempts <= 0) {
      throw error;
    } else {
      setTimeout(() => {
        retry(functionToTry, remainingAttempts, delay);
      }, delay);
    }
  }
}

module.exports = retry;
