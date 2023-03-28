import {readFileSync} from 'fs';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {visit} from 'unist-util-visit';
import {Console} from 'console';
import {stripIndents} from 'common-tags';
import remarkFrontmatter from 'remark-frontmatter';
import matter from './matter.mjs';

export default function polarisComponentDocs(options) {
  const parser = (contents, file) => {
    // turn the file into an AST
    const tree = unified().use(remarkParse).use(remarkFrontmatter).parse(file);
    // console.log(tree);

    // add the front matter as an object to the file
    unified().use(matter).parse(file);
    // console.log(file.data.matter);

    // console.log(stripIndents(contents));
    console.log(JSON.stringify(stripIndents(contents)));
    // throw 'eh';
    const bit = {
      type: 'BitNode',
      data: {
        title: file.data.matter?.title,
        text: stripIndents(contents),
        slug: 'polaris.shopify.com',
      },
    };

    return {
      type: 'root',
      children: [bit],
    };
  };

  Object.assign(this, {Parser: parser});
}
