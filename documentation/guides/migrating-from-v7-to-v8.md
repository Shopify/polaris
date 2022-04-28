# Migrating from v7 to v8

Polaris v8.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v8.0.0)) features a change to the required node version and root font size.

## Node support

Node 16 is now a requirement.

## Base font size

~~`html {font-size: 62.5%}`~~

`html {font-size: 100%}`

No changes are needed if your app uses the `rem()` function for css values. If your app caches css files you'll need to rebuild them once you upgrade to v8.0.0.

Polaris has switched to the browser default of 16px for its base font size instead of the previous 10px.

If you have hard coded rem values then you will need to modify them to use the `rem()` function or recalculate them accordingly:

`rem(16px) => 1.6rem` is no longer true (16 / 10).

`rem(16px) => 1rem` is the new conversion (16 / 16).

We've created the following codemod to help with manually set rem values:

<details>
  <summary>Codemod to convert hard coded rems</summary>

```jsx
// node index.js <target-path>
​
import fs from 'fs/promises'
import path from 'path'
import os from 'os'
​
import pMap from 'p-map'
import { globby } from 'globby'
​
const target = path.resolve(process.cwd(), process.argv[2])
​
const stats = {
  files: 0,
  rems: 0,
}
​
if (!target) {
  console.log('Please specify a target directory')
  process.exit(1)
}
​
const scssPaths = await globby('**/*.scss', {
  cwd: target,
  ignore: ['**/node_modules/**/*.scss'],
  absolute: true,
})
​
console.log(`Checking for rems in ${scssPaths.length} file(s)\n`)
​
async function replaceRems(filePath) {
  let hasRems = false
  const fileContent = await fs.readFile(filePath, { encoding: 'utf8' })
  const remRegex = /(-?\d+(?:\.\d+|\d*))rem/g
​
  const newContent = fileContent.replace(remRegex, (_, unit) => {
    hasRems = true
    stats.rems++
​
    const value = parseFloat(unit) * 10 // Note: 1rem was previously 10px
​
    return `rem(${value}px)`
  })
​
  if (hasRems) stats.files++
​
  await fs.writeFile(filePath, newContent)
}
​
await pMap(scssPaths, replaceRems, { concurrency: os.cpus().length })
​
console.log(`Updated ${stats.rems} rems in ${stats.files} files\n`)
​
console.log('Done! 🌈')
```

</details>
