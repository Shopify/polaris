function Retry(
  functionToTry,
  maxAttempts = 3,
  delay = 1000,
  currentAttempt = 0,
) {
  if (currentAttempt >= maxAttempts) {
    throw new Error();
  }
  try {
    functionToTry();
  } catch (error) {
    setTimeout(() => {
      Retry(functionToTry, currentAttempt + 1, maxAttempts, delay);
    }, delay);
  }
}

module.exports.default = Retry;
