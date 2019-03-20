const retry = (functionToTry, maxAttempts = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    let remainingAttempts = maxAttempts;
    const intervalId = setInterval(() => {
      try {
        functionToTry();
        clearInterval(intervalId);
        resolve();
      } catch (error) {
        remainingAttempts -= 1;
        if (remainingAttempts <= 0) {
          clearInterval(intervalId);
          reject(error);
        }
      }
    }, delay);
  });
};

module.exports = retry;
