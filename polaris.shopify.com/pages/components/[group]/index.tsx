import globby from 'globby';
import path from 'path';

export default function GroupPage(props: any) {
  return <div>{capitalize(props.group.replace(/-/g, ' '))}</div>;
}
export async function getStaticProps(context: any) {
  return {
    props: {group: context.params.group},
  };
}

export const getStaticPaths = async () => {
  const globPath = path.resolve(process.cwd(), 'content/components/**/*.md');
  const paths = globby
    .sync(globPath)
    .map((path) => path.replace(`${process.cwd()}/content`, ''));

  const sections = paths.map((path) => path.split('/')[2]);

  return {
    paths: sections
      .filter((section, index) => sections.indexOf(section) === index)
      .map((section) => ({params: {group: section}})),
    fallback: false,
  };
};

export function capitalize(word = '') {
  const wordLower = word.toLowerCase();
  return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
}
