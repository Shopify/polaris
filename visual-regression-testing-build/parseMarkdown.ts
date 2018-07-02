import fs from 'fs';
import glob from 'glob';
import grayMatter from 'gray-matter';

interface ComponentMatterData {
  name: string;
  category: string;
  keywords?: string[] | null;
  order?: number | null;
  hidePlayground?: boolean | null;
}

export default function readMarkDownFiles() {
  const files = glob.sync(
    `${__dirname}/../src/{components,embedded}/**/README.md`,
    {},
  );

  return files.map((file) => {
    const data = fs.readFileSync(file, 'utf8');
    return parseCodeExamples(data);
  });
}

function parseCodeExamples(data: string) {
  const matter = grayMatter(data);
  const introAndComponentSections = matter.content
    .split(/(?=\n---\n|\n## Examples\n)/)
    .map((content) => content.replace('---\n', '').trim())
    .filter((content) => content !== '');
  const [, ...componentSections] = introAndComponentSections;

  const examplesAndHeader = componentSections
    .filter((markdown) => markdown.startsWith('## Examples'))
    .join('')
    .split('###');

  const [, ...examples] = examplesAndHeader;

  return [
    (matter.data as ComponentMatterData).name
      .replace(/’/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase(),
    examples
      .map((example) => {
        return example.split('```')[1].split('jsx')[1];
      })
      .filter((content) => content !== ''),
  ];
}
