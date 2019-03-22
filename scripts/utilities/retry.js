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

(async () => {
  const commands = [
    `git checkout -b update-polaris-`,
    `npx yarn@ upgrade @shopify/polaris@ --no-progress --ignore-engines`,
    `git add package.json yarn.lock`,
    `git commit -m "Update @shopify/polaris to" --author --allow-empty`,
    `git push origin update-polaris-`,
    `curl -d '`,
  ];

  const runCommand = async (command) => {
    await retry(() => {
      console.log(command);
      throw new Error('noo');
    });
  };

  for (const command of commands) {
    await runCommand(command);
  }
})();

module.exports = retry;
