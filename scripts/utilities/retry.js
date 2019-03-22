function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry(functionToTry, maxAttempts = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    try {
      functionToTry();
      resolve();
    } catch (error) {
      const remainingAttempts = maxAttempts - 1;
      if (remainingAttempts <= 0) {
        reject(error);
      } else {
        await timeout(delay);
        retry(functionToTry, remainingAttempts, delay);
      }
    }
  });
}

module.exports = retry;
