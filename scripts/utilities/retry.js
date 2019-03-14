function retry(functionToTry, maxAttempts = 3, delay = 1000) {
  if (maxAttempts <= 0) {
    throw new Error();
  }
  try {
    functionToTry();
  } catch (error) {
    setTimeout(() => {
      retry(functionToTry, maxAttempts - 1, delay);
    }, delay);
  }
}

module.exports = retry;
