import fs from 'fs';
import globby from 'globby';
import path from 'path';
import ComponentThumbnail from '../../../src/components/ComponentThumbnail';
import Grid from '../../../src/components/Grid';
import Page from '../../../src/components/Page';
import Markdown from '../../../src/components/Markdown';
import TipBanner from '../../../src/components/TipBanner/TipBanner';
import {parseMarkdown} from '../../../src/utils/markdown.mjs';
import {stripMarkdownLinks} from '../../../src/utils/various';

interface Group {
  title: string;
  description: string;
  components: string;
  tip: string;
}

interface FrontMatter {
  title: string;
  description: string;
  groups?: Group[];
}

interface Props {
  group: string;
  frontMatter: FrontMatter;
  editPageLinkPath: string;
  components: string[];
  componentDescriptions: {
    [key: string]: string;
  };
}

export default function GroupPage({
  group,
  components: componentPaths,
  frontMatter,
  editPageLinkPath,
  componentDescriptions,
}: Props) {
  const {groups} = frontMatter;

  const groupsMarkup = groups?.map(({title, description, components, tip}) => (
    <>
      <h4>{title}</h4>
      <p>{description}</p>
      <Grid condensed>
        {components.split(', ').map((component) => {
          const componentSlug = component.replace(/ /g, '-').toLowerCase();
          return (
            <Grid.Item
              key={component}
              title={component}
              description={stripMarkdownLinks(
                componentDescriptions[componentSlug],
              )}
              url={`/components/${group}/${componentSlug}`}
              renderPreview={() => <ComponentThumbnail title={component} />}
            />
          );
        })}
      </Grid>
      <TipBanner title="Tip" message={tip} />
    </>
  ));

  const componentsFromPaths = (
    <Grid condensed>
      {componentPaths.map((component) => {
        return (
          <Grid.Item
            key={component}
            title={capitalize(component.replace(/-/g, ' '))}
            description={stripMarkdownLinks(componentDescriptions[component])}
            url={`/components/${group}/${component}`}
            renderPreview={() => <ComponentThumbnail title={component} />}
          />
        );
      })}
    </Grid>
  );

  return (
    <Page title={frontMatter.title} editPageLinkPath={editPageLinkPath}>
      {groupsMarkup || componentsFromPaths}
      <Markdown text={frontMatter.description} />
    </Page>
  );
}

export async function getStaticProps(context: {params: {group: string}}) {
  const globPath = path.resolve(
    process.cwd(),
    `content/components/${context.params.group}/*.md`,
  );
  const components = globby
    .sync(globPath)
    .map((path) =>
      path
        .replace(
          `${process.cwd()}/content/components/${context.params.group}/`,
          '',
        )
        .replace('.md', ''),
    )
    .filter((component) => component !== 'index');

  const componentDescriptions = components.map((component) => {
    const componentRelativePath = `content/components/${context.params.group}/${component}.md`;
    const componentPath = path.resolve(process.cwd(), componentRelativePath);
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    const {
      frontMatter: {description = ''},
    } = parseMarkdown(componentContent) as {
      frontMatter: FrontMatter;
    };

    return fs.existsSync(componentPath) ? [component, description] : [];
  });

  const relativeMdPath = `content/components/${context.params?.group}/index.md`;
  const editPageLinkPath = `polaris.shopify.com/${relativeMdPath}`;
  const mdFilePath = path.resolve(process.cwd(), relativeMdPath);

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(
      `content/components/${context.params.group}/index.md`,
      'utf-8',
    );

    const {frontMatter, readme} = parseMarkdown(componentMarkdown);

    return {
      props: {
        group: context.params.group,
        frontMatter,
        readme,
        editPageLinkPath,
        components,
        componentDescriptions: Object.fromEntries(componentDescriptions),
      },
    };
  } else {
    return {notFound: true};
  }
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

function capitalize(word = '') {
  const wordLower = word.toLowerCase();
  return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
}
