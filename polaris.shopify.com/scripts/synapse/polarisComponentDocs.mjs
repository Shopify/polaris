import {readFileSync} from 'fs';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {visit} from 'unist-util-visit';
import {Console} from 'console';
import {stripIndents} from 'common-tags';
import remarkFrontmatter from 'remark-frontmatter';
import matter from './matter.mjs';

async function main() {
  const file = readFileSync(
    '/Users/yurm/src/github.com/Shopify/polaris/polaris.shopify.com/content/components/actions/account-connection.md',
  );

  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(matter)
    .use(polarisComponentDocs)
    .parse(file);
  // console.log(tree);
}

main();

export default function polarisComponentDocs(options) {
  const parser = (contents, file) => {
    // turn the file into an AST
    const tree = unified().use(remarkParse).use(remarkFrontmatter).parse(file);
    // console.log(tree);

    // add the front matter as an object to the file
    unified().use(matter).parse(file);
    // console.log(file.data.matter);

    throw 'hello';
    return 'hello';
  };

  Object.assign(this, {Parser: parser});
}
