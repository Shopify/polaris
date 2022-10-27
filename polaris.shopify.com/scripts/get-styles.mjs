import fs from 'fs';

const builtStylesPath = '../polaris-react/build/esm/styles.css';
const fileDestination = 'public/polaris-styles.css';

fs.copyFile(builtStylesPath, fileDestination, (error) => {
  if (error) {
    throw new Error(`Error copying styles file: ${error}`);
  }

  console.log('✅ Copied polaris styles');
});
