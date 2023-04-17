import globby from 'globby';
import fs from 'fs';
import {resolve} from 'path';

function main() {
  globby(['.cache/**/embeddings/*.json']).then((paths) => {
    const all = {
      version: 1,
      embeddingModel: 'openai.com:text-embedding-ada-002',
      bits: [],
    };

    let hold = [];

    paths.forEach((path) => {
      const fileContents = JSON.parse(
        fs.readFileSync(resolve(path)).toString(),
      );
      console.log(fileContents.bits);

      hold = [...hold, ...fileContents.bits];
    });
    all.bits = hold;

    fs.writeFileSync(
      resolve('.cache/embeddings/', 'allBits.json'),
      JSON.stringify(all),
      {flag: 'w'},
    );
  });
  // console.log(paths);
  // throw 'eh';
}

main();
