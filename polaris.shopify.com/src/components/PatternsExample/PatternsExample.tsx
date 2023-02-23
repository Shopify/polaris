import {Fragment, useEffect, useState} from 'react';
import {format} from 'prettier/standalone';
import babel from 'prettier/parser-babel';
import {createUrl} from 'playroom';
import {Stack} from '../Stack';
import styles from './PatternsExample.module.scss';
import GrowFrame from '../GrowFrame';
import Code from '../Code';
import ExampleWrapper, {LinkButton} from '../ExampleWrapper';
import InlinePill from '../InlinePill';
import {PatternExample} from '../../types';

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
        code: `
{/* [Polaris Pattern] ${patternName} */}
{/* Generated on ${getISOStringYear()} from ${window.location.href} */}
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

const PatternsExample = ({
  example,
  patternName,
  showCode,
  onCodeToggle,
}: {
  example: PatternExample;
  patternName: string;
  showCode?: boolean;
  onCodeToggle?: () => void;
}) => {
  const isControlled = typeof showCode === 'undefined';
  const [codeActive, toggleCode] = useState(false);
  const showCodeValue = isControlled ? codeActive : showCode;
  const handleCodeToggle = () => {
    if (onCodeToggle) onCodeToggle();
    if (isControlled) {
      toggleCode((codeActive) => !codeActive);
    }
  };
  const formatCodeSnippet = (code: string) => {
    let prettifiedCode;

    try {
      prettifiedCode = format(code, {
        parser: 'babel',
        plugins: [babel],
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error(error);
        // proceed gracefully
        prettifiedCode = code;
      } else {
        throw error;
      }
    }

    // We trim and call a custom replace here
    // Because prettier appends a semi-colon at the end of the detected JSX phrase for some reason.
    // TODO: Validate whether or not we can solve this at a config level. (i.e. disable the rule)

    return prettifiedCode.trim().replace(/[;$]/g, (match, offset, string) => {
      if (
        offset === string.length - 1 ||
        string.lastIndexOf(match) === offset
      ) {
        return '';
      }
      return match;
    });
  };
  const [previewUrl, setPreviewUrl] = useState('');
  useEffect(() => {
    function constructLivePreview(code: string, context?: string) {
      const livePreviewCode = context
        ? context.replace('____CODE____', code)
        : code;
      return `/playroom/preview/index.html${createUrl({
        code: formatCodeSnippet(livePreviewCode),
        themes: ['locale:en'],
        paramType: 'search',
      })}`;
    }
    setPreviewUrl(constructLivePreview(example.code, example.context));
  }, [example.code, example.context]);
  const {code, snippetCode} = example;

  return (
    <Fragment>
      <p>
        This pattern uses the{' '}
        {example.relatedComponents.map((component, index) => {
          if (
            index === example.relatedComponents.length - 1 &&
            example.relatedComponents.length > 1
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
            <Fragment key={component.url}>
              {index > 0 ? ', ' : null}
              <InlinePill as="a" key={component.url} href={component.url}>
                {component.label}
              </InlinePill>
            </Fragment>
          );
        })}
        {example.relatedComponents.length > 1 ? ' components' : ' component'}
      </p>
      <Stack gap="2" className={styles.SpecificityBuster}>
        <ExampleWrapper
          className={styles.ExampleWrapper}
          renderFrameActions={() => (
            <Fragment>
              <PlayroomButton code={example.code} patternName={patternName} />
              <LinkButton onClick={handleCodeToggle}>
                {showCodeValue ? 'Hide code' : 'Show code'}
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
        {showCodeValue ? (
          <Code
            code={[
              {
                title: 'React',
                code: formatCodeSnippet(snippetCode ? snippetCode : code),
              },
            ]}
          />
        ) : null}
      </Stack>
    </Fragment>
  );
};

export default PatternsExample;
