function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry(functionToTry, maxAttempts = 3, delay = 1000) {
  // We should fix this but I've not got the time at the moment
  // eslint-disable-next-line no-async-promise-executor
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
