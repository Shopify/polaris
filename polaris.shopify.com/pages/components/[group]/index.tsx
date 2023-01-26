import fs from 'fs';
import globby from 'globby';
import path from 'path';
import {AlphaStack, Text} from '@shopify/polaris';
import Grid from '../../../src/components/Grid';
import Page from '../../../src/components/Page';
import TipBanner from '../../../src/components/TipBanner/TipBanner';
import ComponentThumbnail from '../../../src/components/ComponentThumbnail';
import {parseMarkdown} from '../../../src/utils/markdown.mjs';
import {stripMarkdownLinks} from '../../../src/utils/various';
import PageMeta from '../../../src/components/PageMeta';
import Longform from '../../../src/components/Longform';

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
      <AlphaStack>
        <Text as="h5" variant="headingLg">
          {title}
        </Text>
        <p>{description}</p>
      </AlphaStack>
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
      <PageMeta
        title={frontMatter?.title}
        description={frontMatter?.description}
      />
      <AlphaStack>
        <Longform firstParagraphIsLede>
          <p>{frontMatter?.description}</p>
        </Longform>
        {groupsMarkup || componentsFromPaths}
      </AlphaStack>
    </Page>
  );
}

export async function getStaticProps(context: {params: {group: string}}) {
  const {group} = context.params;
  const globPath = path.resolve(
    process.cwd(),
    `content/components/${group}/*.md`,
  );
  const components = globby
    .sync(globPath)
    .map((path) =>
      path
        .replace(`${process.cwd()}/content/components/${group}/`, '')
        .replace('.md', ''),
    )
    .filter((component) => component !== 'index');

  const componentDescriptions = components.map((component) => {
    const componentRelativePath = `content/components/${group}/${component}.md`;
    const componentPath = path.resolve(process.cwd(), componentRelativePath);
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    const {
      frontMatter: {description = ''},
    } = parseMarkdown(componentContent) as {
      frontMatter: FrontMatter;
    };

    return fs.existsSync(componentPath) ? [component, description] : [];
  });

  const relativeMdPath = `content/components/${group}/index.md`;
  const editPageLinkPath = `polaris.shopify.com/${relativeMdPath}`;
  const mdFilePath = path.resolve(process.cwd(), relativeMdPath);

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(
      `content/components/${group}/index.md`,
      'utf-8',
    );

    const {frontMatter, readme} = parseMarkdown(componentMarkdown);

    return {
      props: {
        group,
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

  const groups = paths.map((path) => path.split('/')[2]);

  return {
    paths: groups
      .filter(
        (group, index) =>
          groups.indexOf(group) === index && group !== 'index.md',
      )
      .map((group) => ({params: {group}})),
    fallback: false,
  };
};

function capitalize(word = '') {
  const wordLower = word.toLowerCase();
  return wordLower.charAt(0).toUpperCase() + wordLower.slice(1);
}
