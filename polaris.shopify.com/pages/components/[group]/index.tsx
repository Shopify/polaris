import fs from 'fs';
import globby from 'globby';
import path from 'path';
import {Text} from '@shopify/polaris';
import ComponentThumbnail from '../../../src/components/ComponentThumbnail';
import Grid from '../../../src/components/Grid';
import Page from '../../../src/components/Page';
import Markdown from '../../../src/components/Markdown';
import TipBanner from '../../../src/components/TipBanner/TipBanner';
import {parseMarkdown} from '../../../src/utils/markdown.mjs';
import {stripMarkdownLinks} from '../../../src/utils/various';

interface Group {
  title?: string;
  description?: string;
  components?: string;
  tip?: string;
}

interface FrontMatter {
  title?: string;
  description?: string;
  groups?: Group[];
}

interface Props {
  group?: string;
  frontMatter?: FrontMatter;
  components?: string[];
  componentDescriptions?: {
    [key: string]: string;
  };
}

export default function GroupPage({
  group,
  components: componentPaths,
  frontMatter,
  componentDescriptions,
}: Props) {
  const groups = frontMatter?.groups;

  const groupsMarkup = groups?.map(({title, description, components, tip}) => (
    <>
      <Text as="h4" variant="headingMd">
        {title}
      </Text>
      <p>{description}</p>
      <Grid condensed>
        {components?.split(', ').map((component) => {
          const componentSlug = component.replace(/ /g, '-').toLowerCase();
          const url = group
            ? `/components/${group}/${componentSlug}`
            : `/components/${componentSlug}`;
          return (
            <Grid.Item
              key={component}
              title={component}
              description={stripMarkdownLinks(
                componentDescriptions?.[componentSlug] || '',
              )}
              url={url}
              renderPreview={() => (
                <ComponentThumbnail title={component} group={group} />
              )}
            />
          );
        })}
      </Grid>
      {tip && <TipBanner title="Tip" message={tip} />}
    </>
  ));

  const componentsFromPaths = (
    <Grid condensed>
      {componentPaths?.map((component) => {
        const url = group
          ? `/components/${group}/${component}`
          : `/components/${component}`;
        return (
          <Grid.Item
            key={component}
            title={capitalize(component.replace(/-/g, ' '))}
            description={stripMarkdownLinks(
              componentDescriptions?.[component] || '',
            )}
            url={url}
            renderPreview={() => (
              <ComponentThumbnail title={component} group={group} />
            )}
          />
        );
      })}
    </Grid>
  );

  return (
    <Page title={frontMatter?.title}>
      {groupsMarkup || componentsFromPaths}
      <Markdown text={frontMatter?.description || ''} />
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
