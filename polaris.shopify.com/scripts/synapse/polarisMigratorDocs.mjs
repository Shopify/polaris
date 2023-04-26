import path from 'path';
import {stripIndents} from 'common-tags';

export default function polarisMigratorDocs(options) {
  const parser = (contents, file) => {
    // turn the file into an AST
    // const tree = unified().use(remarkParse).use(remarkFrontmatter).parse(file);
    // unified().use(matter).parse(file);
    // console.log(file.data.matter);
    // const slug = file.history[0].replace('.md', '').replace('./content', '');
    // const title = file;
    // const description = file.data.matter.description;
    // let exampleBits;

    // if (file.data.matter.examples?.length > 0) {
    //   exampleBits = file.data.matter.examples.map((e) => {
    //     const filepath = resolve(process.cwd(), `pages/examples/${e.fileName}`);
    //     const example = readFileSync(filepath).toString();
    //     return {
    //       type: 'BitNode',
    //       data: {
    //         title: `${title} component ${e.title}`,
    //         text: stripIndents(example),
    //         slug,
    //       },
    //     };
    //   });
    // }

    // console.log(file);

    // throw 'eh';
    const docBit = {
      type: 'BitNode',
      data: {
        title:
          'Polaris migration for ' + path.basename(file.history[0], '.tsx'),
        text: stripIndents(contents),
        metadata: {
          slug: '/tools/migrations',
        },
      },
    };

    // const allBits = exampleBits ? [docBit, ...exampleBits] : [docBit];

    // console.log(allBits);
    // throw 'eh';

    const constructed = {
      type: 'root',
      children: [docBit],
    };

    return constructed;
  };

  Object.assign(this, {Parser: parser});
}
