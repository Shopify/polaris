import {Fragment, useEffect, useState} from 'react';
import {createUrl} from 'playroom';
import styles from './PatternsExample.module.scss';
import {MaximizeMajor} from '@shopify/polaris-icons';
import {Icon, Text} from '@shopify/polaris';
import Markdown from '../Markdown';
import GrowFrame from '../GrowFrame';
import Code from '../Code';
import ExampleWrapper, {LinkButton} from '../ExampleWrapper';
import InlinePill from '../InlinePill';

export type PatternExample = {
  title: string;
  code: string;
  context?: string;
  snippetCode?: string;
  description?: string;
};

const getISOStringYear = () => new Date().toISOString().split('T')[0];

const PlayroomButton = ({
  code,
  patternName,
}: {
  code: string;
  patternName: string;
}) => {
  const [encodedUrl, setEncodedUrl] = useState('');
  useEffect(() => {
    setEncodedUrl(
      createUrl({
        baseUrl: '/sandbox/',
        code: `// [Polaris Pattern] ${patternName}
  // Generated on ${getISOStringYear()} from ${window.location.href}
  ${/* intentional blank line */ ''}
  ${code}`.trim(),
        // TODO: Is this correct?
        themes: ['locale:en'],
        paramType: 'search',
      }),
    );
  }, [code, patternName]);

  return (
    <a
      href={encodedUrl}
      className={styles.Link}
      target="_blank"
      rel="noreferrer"
    >
      Edit in Sandbox
    </a>
  );
};

type RelatedComponentDocumentation = {
  label: string;
  url: string;
};

const PatternsExample = ({
  example,
  patternName,
  relatedComponents,
}: {
  example: PatternExample;
  patternName: string;
  relatedComponents: RelatedComponentDocumentation[];
}) => {
  const [codeActive, toggleCode] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  useEffect(() => {
    function constructLivePreview(code: string, context?: string) {
      const livePreviewCode = context
        ? context.replace('____CODE____', code)
        : code;

      return `/playroom/preview/index.html${createUrl({
        code: livePreviewCode,
        paramType: 'search',
      })}`;
    }
    setPreviewUrl(constructLivePreview(example.code, example.context));
  }, [example.code, example.context]);
  const {code, description, snippetCode} = example;

  return (
    <Fragment>
      {description ? <Markdown text={description} /> : null}
      <ExampleWrapper
        renderFrameActions={() => (
          <Fragment>
            <a target="_blank" href={exampleUrl} rel="noreferrer">
              <Text variant="bodySm" as="span" visuallyHidden>
                View fullscreen preview
              </Text>
              <Icon source={MaximizeMajor} />
            </a>
            <PlayroomButton
              code={example.code}
              patternName={`${patternName} > ${example.title}`}
            />
            <LinkButton onClick={() => toggleCode((codeActive) => !codeActive)}>
              {codeActive ? 'Hide code' : 'Show code'}
            </LinkButton>
          </Fragment>
        )}
      >
        <GrowFrame
          id="live-preview-iframe"
          defaultHeight={'400px'}
          src={previewUrl}
        />
      </ExampleWrapper>
      {codeActive ? (
        <Code
          code={[
            {
              title: 'React',
              code: snippetCode ? snippetCode.trim() : code.trim(),
            },
          ]}
        />
      ) : null}
      <p>
        This pattern uses the{' '}
        {relatedComponents.map((component, index) => {
          if (
            index === relatedComponents.length - 1 &&
            relatedComponents.length > 1
          ) {
            return (
              <Fragment key={component.url}>
                {' and '}
                <InlinePill as="a" href={component.url}>
                  {component.label}
                </InlinePill>
              </Fragment>
            );
          }
          return (
            <InlinePill as="a" key={component.url} href={component.url}>
              {component.label}
            </InlinePill>
          );
        })}
        {relatedComponents.length > 1 ? ' components' : ' component'}
      </p>
    </Fragment>
  );
};

export default PatternsExample;
