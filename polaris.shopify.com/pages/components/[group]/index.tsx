import fs from 'fs';
import globby from 'globby';
import path from 'path';
import {VFile} from 'vfile';
import {Text} from '@shopify/polaris';
import {Grid, GridItem} from '../../../src/components/Grid';
import Page from '../../../src/components/Page';
import TipBanner from '../../../src/components/TipBanner/TipBanner';
import ComponentThumbnail from '../../../src/components/ComponentThumbnail';
import {parseMarkdown} from '../../../src/utils/markdown.mjs';
import {stripMarkdownLinks} from '../../../src/utils/various';
import PageMeta from '../../../src/components/PageMeta';
import Longform from '../../../src/components/Longform';
import Markdown from '../../../src/components/Markdown';
import {Stack} from '../../../src/components/Stack';
import type {SerializedMdx} from '../../../src/types';
import {serializeMdx} from '../../../src/components/Markdown/serialize';

interface Group {
  title?: string;
  description?: string;
  components?: string[];
  tip?: string;
}

type FrontMatter = {
  title?: string;
  description?: string;
  groups?: Group[];
  relatedResources?: string[];
};

interface Props {
  group?: string;
  frontMatter?: FrontMatter;
  components?: string[];
  componentDescriptions?: {
    [key: string]: string;
  };
  description: SerializedMdx;
  mdx: SerializedMdx<FrontMatter>;
}

export default function GroupPage({
  group,
  components: componentPaths,
  description,
  mdx,
  componentDescriptions,
}: Props) {
  const {frontmatter} = mdx;
  const groups = frontmatter?.groups;
  const groupsMarkup = groups?.map(({title, description, components, tip}) => (
    <>
      <Stack gap="4">
        <Text as="h4" variant="headingLg">
          {title}
        </Text>
        <p>{description}</p>
      </Stack>
      <Grid condensed>
        {components?.map((component) => {
          const componentSlug = component.replace(/ /g, '-').toLowerCase();
          const url = group
            ? `/components/${group}/${componentSlug}`
            : `/components/${componentSlug}`;
          return (
            <GridItem
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
      {tip && (
        <TipBanner title="Tip">
          <p>{tip}</p>
        </TipBanner>
      )}
    </>
  ));

  const componentsFromPaths = (
    <Grid condensed>
      {componentPaths?.map((component) => {
        const url = group
          ? `/components/${group}/${component}`
          : `/components/${component}`;
        return (
          <GridItem
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
    <Page title={frontmatter?.title}>
      <PageMeta
        title={frontmatter?.title}
        description={frontmatter?.description}
      />
      <Stack gap="16">
        <Stack gap="4">
          {description && (
            <Longform firstParagraphIsLede>
              <Markdown {...description} />
            </Longform>
          )}

          {groupsMarkup || componentsFromPaths}
        </Stack>
        <Stack gap="4">
          <Markdown {...mdx} />
        </Stack>
      </Stack>
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
    const mdFilePath = `${process.cwd()}/content/components/${group}/index.md`;

    const [mdx] = await serializeMdx<FrontMatter>(mdFilePath, {
      load: (filePath) => fs.readFileSync(filePath, 'utf-8'),
    });
    let description = null;

    if (mdx.frontmatter.description) {
      // Since this markdown didn't come from a real file, we use a VFile
      // instead
      [description] = await serializeMdx(
        new VFile(mdx.frontmatter.description),
      );
    }

    return {
      props: {
        group,
        mdx,
        description,
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
