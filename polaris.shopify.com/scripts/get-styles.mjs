import fs from 'fs';

const builtStylesPath = '../polaris-react/build/esm/styles.css';
const fileDestination = 'public/polaris-styles.css';

fs.copyFile(builtStylesPath, fileDestination, (error) => {
  if (error) console.log(`Error copying polaris styles: ${error}`);

  console.log('✅ Copied polaris styles');
});
