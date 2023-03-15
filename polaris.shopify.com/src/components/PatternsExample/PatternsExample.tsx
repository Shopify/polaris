import {Fragment, useEffect, useState} from 'react';
import {format} from 'prettier/standalone';
import babel from 'prettier/parser-babel';
import endent from 'endent';
import {createUrl} from 'playroom';
import styles from './PatternsExample.module.scss';
import GrowFrame from '../GrowFrame';
import Code from '../Code';
import ExampleWrapper, {LinkButton} from '../ExampleWrapper';

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
        code: endent`
          {/* [Polaris Pattern] ${patternName} */}
          {/* Generated on ${getISOStringYear()} from ${
          window.location.href
        } */}
          {/* This example is for guidance purposes. Copying it will come with caveats. */}
          ${/* intentional blank line */ ''}
          ${code}
        `,
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
  example: any;
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
      // Casting because the typescript function(str: string) overload is missing
      prettifiedCode = format(endent(code as unknown as TemplateStringsArray), {
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

  const formattedCode = formatCodeSnippet(example.code);

  const sandboxCode = example.sandboxContext
    ? formatCodeSnippet(
        example.sandboxContext
          .replace(/\\\#/g, '')
          .replace(/____CODE____;?/, formattedCode),
      )
    : formattedCode;

  const previewCode = example.previewContext
    ? formatCodeSnippet(
        example.previewContext
          .replace(/\\\#/g, '')
          .replace(/____CODE____;?/, formattedCode),
      )
    : formattedCode;

  const previewUrl = `/playroom/preview/index.html${createUrl({
    code: previewCode,
    themes: ['locale:en'],
    paramType: 'search',
  })}`;

  return (
    <>
      <ExampleWrapper
        renderFrameActions={() => (
          <Fragment>
            <PlayroomButton code={sandboxCode} patternName={patternName} />
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
              code: endent`
                // This example is for guidance purposes. Copying it will come with caveats.
                ${formattedCode}
              `,
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default PatternsExample;
