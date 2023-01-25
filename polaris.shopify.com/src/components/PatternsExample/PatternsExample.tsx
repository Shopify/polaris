import {Fragment, useEffect, useState} from 'react';
import {format} from 'prettier/standalone';
import babel from 'prettier/parser-babel';
import {createUrl} from 'playroom';
import {Stack} from '../Stack';
import styles from './PatternsExample.module.scss';
import GrowFrame from '../GrowFrame';
import Code from '../Code';
import ExampleWrapper, {LinkButton} from '../ExampleWrapper';

export type PatternExample = {
  code: string;
  context?: string;
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
        code: `{/* [Polaris Pattern] ${patternName} */}
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
    const prettifiedCode = format(code, {
      parser: 'babel',
      plugins: [babel],
    });

    // We trim and call a custom replace here
    // Because prettier appends a semi-colon at the end of the detected JSX phrase for some reason.
    // TODO: Validate whether or not we can solve this at a config level. (i.e. disable the rule)
    return prettifiedCode.trim().replace(/[;$]/g, (match, __, string) => {
      if (string.indexOf(match) === string.length - 1) {
        return '';
      }
      return match;
    });
  };

  const formattedCode = formatCodeSnippet(example.code);

  const livePreviewCode = example.context
    ? example.context.replace('____CODE____', formattedCode)
    : example.code;

  console.log({livePreviewCode});

  const previewUrl = `/playroom/preview/index.html${createUrl({
    code: livePreviewCode,
    paramType: 'search',
  })}`;

  return (
    <Stack gap="2" className={styles.SpecificityBuster}>
      <ExampleWrapper
        className={styles.ExampleWrapper}
        renderFrameActions={() => (
          <Fragment>
            <PlayroomButton code={formattedCode} patternName={patternName} />
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
              code: formattedCode,
            },
          ]}
        />
      ) : null}
    </Stack>
  );
};

export default PatternsExample;
