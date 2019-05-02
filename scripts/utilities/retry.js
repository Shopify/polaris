function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry(functionToTry, maxAttempts = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    let remainingAttempts = maxAttempts;
    while (remainingAttempts > 0) {
      remainingAttempts -= 1;
      try {
        functionToTry();
        resolve();
        break;
      } catch (error) {
        if (remainingAttempts === 0) {
          reject(error);
        }
        await sleep(delay);
      }
    }
  });
}

module.exports = retry;
