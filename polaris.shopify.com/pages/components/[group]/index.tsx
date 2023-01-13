import {GetStaticPaths} from 'next';

export default function GroupPage(props: any) {
  return <div>{capitalize(props.group.replace(/-/g, ' '))}</div>;
}
export async function getStaticProps(context: any) {
  return {
    props: {group: context.params.group},
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const globPath = path.resolve(process.cwd(), 'content/components/**/*.md');
  // const paths = globby
  //   .sync(globPath)
  //   .filter((path) => !path.endsWith('index.md'))
  //   .map((path) =>
  //     path.replace(`${process.cwd()}/content`, '').replace('.md', ''),
  //   );

  return {
    // paths: ['abc', 'def'],
    paths: [
      {params: {group: 'actions'}},
      {params: {group: 'deprecated'}},
      {params: {group: 'feedback-indicators'}},
      {params: {group: 'images-and-icons'}},
      {params: {group: 'layout-and-structure'}},
      {params: {group: 'lists'}},
      {params: {group: 'navigation'}},
      {params: {group: 'overlays'}},
      {params: {group: 'seelction-and-input'}},
      {params: {group: 'tables'}},
      {params: {group: 'typography'}},
      {params: {group: 'utilities'}},
    ],
    fallback: false,
  };
};

export function capitalize(word = '') {
  const wordLower = word.toLowerCase();
  return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
}
