import fs from 'fs';
import glob from 'glob';
import grayMatter from 'gray-matter';

export default function readMarkDownFiles() {
  const files = glob.sync(`${__dirname}/../src/components/***/README.md`);

  return files.map((file) => {
    const data = fs.readFileSync(file, 'utf8');
    return parseCodeExamples(data);
  });
}

function stripCodeBlock(block: string) {
  return block
    .replace(/```jsx/, '')
    .replace('```', '')
    .trim();
}

function parseCodeExamples(data) {
  const matter = grayMatter(data);
  const introAndComponentSections = matter.content
    .split(/(\n---\n)/)
    .map((content) => content.replace('---\n', '').trim())
    .filter((content) => content !== '');
  const [, ...componentSections] = introAndComponentSections;

  const examplesAndHeader = componentSections
    .filter((markdown) => markdown.startsWith('## Examples'))
    .join('')
    .split('###');

  const [, ...examples] = examplesAndHeader;

  return {
    name: matter.data.name,
    slug: matter.data.name
      .replace(/’/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase(),
    examples: examples.map((example) => {
      const nameMatches = example.match(/(.)*/);
      const codeBlock = example.match(/```jsx(.|\n)*?```/g);
      return {
        name: nameMatches === null ? '' : nameMatches[0].trim(),
        code: codeBlock === null ? '' : stripCodeBlock(codeBlock[0]),
      };
    }),
  };
}
