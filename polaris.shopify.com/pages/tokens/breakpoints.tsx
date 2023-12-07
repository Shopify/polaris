import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import React from 'react';
import endent from 'endent';
import {VFile} from 'vfile';
import {serializeMdx} from '../../src/components/Markdown/serialize.mts';
import type {SerializedMdx} from '../../src/types';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';
import Container from '../../src/components/Container';
import Longform from '../../src/components/Longform';
import Markdown from '../../src/components/Markdown';

interface Props {
  mdx: SerializedMdx;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = new VFile({
    value: endent`
    <p id="usage" role="heading" aria-level="2">Usage in Media Queries</p>

    ### Sass variables

    A transform takes the above values and generates Sass variables (which can be
    used in media conditions) for each breakpoint in \`up\`, \`down\`, and \`only\` directions.
    While we currently support \`down\` media conditions, we encourage developers to
    adopt a mobile first strategy and use \`up\` wherever possible.

    Example of generated output for \`breakpoints-md\`:
    \`\`\`scss
    @media #{$p-breakpoints-md-up} {/*...*/}
    @media #{$p-breakpoints-md-down} {/*...*/}
    @media #{$p-breakpoints-md-only} {/*...*/}
    \`\`\`

    To use these Sass variables you will need to import the \`media-queries.scss\`
    file from \`@shopify/polaris-tokens\` in your project:

    \`\`\`scss
    @import 'path/to/node_modules/@shopify/polaris-tokens/dist/scss/media-queries';
    \`\`\`

    ### Media query variables

    A collection of all Sass variables for applying responsive styles at a given breakpoint alias.

    \`\`\`scss
    $p-breakpoints-xs-up: '(min-width: 0em)';
    $p-breakpoints-xs-down: '(max-width: -0.0025em)';
    $p-breakpoints-xs-only: '(min-width: 0em) and (max-width: 30.6225em)';

    $p-breakpoints-sm-up: '(min-width: 30.625em)';
    $p-breakpoints-sm-down: '(max-width: 30.6225em)';
    $p-breakpoints-sm-only: '(min-width: 30.625em) and (max-width: 47.9975em)';

    $p-breakpoints-md-up: '(min-width: 48em)';
    $p-breakpoints-md-down: '(max-width: 47.9975em)';
    $p-breakpoints-md-only: '(min-width: 48em) and (max-width: 64.9975em)';

    $p-breakpoints-lg-up: '(min-width: 65em)';
    $p-breakpoints-lg-down: '(max-width: 64.9975em)';
    $p-breakpoints-lg-only: '(min-width: 65em) and (max-width: 89.9975em)';

    $p-breakpoints-xl-up: '(min-width: 90em)';
    $p-breakpoints-xl-down: '(max-width: 89.9975em)';
    $p-breakpoints-xl-only: '(min-width: 90em)';
    \`\`\`
  `,
    path: '/tokens/breakpoints',
  });

  const [mdx] = await serializeMdx(file);
  return {props: {mdx}};
};

const Components = ({mdx}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageMeta title="Breakpoints" />

      <TokensPage tokenGroup={'breakpoints'} />

      <Container>
        <Longform>
          <Markdown {...mdx} />
        </Longform>
        <br />
        <br />
      </Container>
    </>
  );
};

export default Components;
