import {Fragment, useRef, useEffect, useState, useCallback} from 'react';
import {flushSync} from 'react-dom';
import {format} from 'prettier/standalone';
import babel from 'prettier/parser-babel';
import endent from 'endent';
import {createUrl} from 'playroom';
import {Stack} from '../Stack';
import styles from './PatternsExample.module.scss';
import GrowFrame from '../GrowFrame';
import Code from '../Code';
import ExampleWrapper, {LinkButton} from '../ExampleWrapper';
import {PatternExample} from '../../types';
import {className as classNames} from '../../utils/various';
import {useViewTransition} from '../../utils/hooks';
import {MaximizeMinor, MinimizeMinor} from '@shopify/polaris-icons';
import Icon from '../Icon';

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
  example: PatternExample;
  patternName: string;
  showCode?: boolean;
  onCodeToggle?: () => void;
}) => {
  const dialogRef: React.RefObject<HTMLDialogElement> = useRef(null);
  const maximizeButtonRef: React.RefObject<HTMLSpanElement> = useRef(null);

  const transition = useViewTransition();

  const [codeActive, toggleCode] = useState(false);
  const [dialogActive, toggleDialog] = useState(false);

  const isControlled = typeof showCode === 'undefined';
  const showCodeValue = isControlled ? codeActive : showCode;

  const handleScrollLock = (lock: boolean) => {
    if (lock) {
      document
        ?.querySelector('html')
        ?.setAttribute('style', 'overflow: hidden;');
    } else {
      document?.querySelector('html')?.removeAttribute('style');
    }
  };

  const handleCodeToggle = () => {
    if (onCodeToggle) onCodeToggle();
    if (isControlled) {
      toggleCode((codeActive) => !codeActive);
    }
  };

  const handleMaximize = async () => {
    const dialog = dialogRef.current;
    const maximizeButton = maximizeButtonRef.current;

    return await transition(() => {
      if (dialog && maximizeButton) {
        handleScrollLock(true);
        toggleDialog(true);
        dialog.showModal();

        // @ts-ignore
        maximizeButton.style.viewTransitionName = 'dialog';
      }
      // @ts-ignore
      maximizeButton.style.viewTransitionName = '';
    });
  };

  const handleMinimize = useCallback(async () => {
    const dialog = dialogRef.current;
    const maximizeButton = maximizeButtonRef.current;

    return await transition(() => {
      if (dialog && maximizeButton) {
        handleScrollLock(false);
        toggleDialog(false);
        dialog.close();

        // @ts-ignore
        maximizeButton.style.viewTransitionName = 'dialog';
      }
      // @ts-ignore
      maximizeButton.style.viewTransitionName = '';
    });
  }, [transition]);

  /* Escape to close with the <dialog> element is supposed to "just work", but it only worked here when the backdrop was the active element. Leaving this for now even though it doesn't work. <dialog> is an anomoly because of the top-layer...  */
  useEffect(() => {
    if (dialogActive) {
      const handleKeyDownEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleMinimize();
        }
      };

      window.addEventListener('keyup', handleKeyDownEscape);

      return () => window.removeEventListener('keyup', handleKeyDownEscape);
    }
  }, [dialogActive, handleMinimize]);

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
        example.sandboxContext.replace(/____CODE____;?/, formattedCode),
      )
    : formattedCode;

  const previewCode = example.previewContext
    ? formatCodeSnippet(
        example.previewContext.replace(/____CODE____;?/, formattedCode),
      )
    : formattedCode;

  const previewUrl = `/playroom/preview/index.html${createUrl({
    code: previewCode,
    themes: ['locale:en'],
    paramType: 'search',
  })}`;

  const exampleMarkup = (
    <ExampleWrapper
      className={classNames(styles.ExampleWrapper)}
      renderFrameActions={() => (
        <Fragment>
          <LinkButton
            tabIndex={0}
            className={classNames(
              styles.PositionedLink,
              dialogActive && styles.focus,
            )}
            aria-label="View enlarged example"
            onClick={handleMaximize}
          >
            <span
              ref={maximizeButtonRef}
              className={styles.AnimatedBackground}
            />
            <Icon source={MaximizeMinor} />
          </LinkButton>
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
  );

  const expandedExampleMarkup = (
    <dialog
      ref={dialogRef}
      className={classNames(styles.Dialog, dialogActive && styles.open)}
      // onClose={handleMinimize}
    >
      <div className={styles.PreventBackgroundInteractions} />
      <ExampleWrapper
        className={styles.ExampleWrapper}
        renderFrameActions={() => (
          <Fragment>
            <LinkButton
              tabIndex={0}
              className={styles.PositionedLink}
              aria-label="Close enlarged example"
              onClick={handleMinimize}
            >
              <Icon source={MinimizeMinor} />
            </LinkButton>
            <PlayroomButton code={sandboxCode} patternName={patternName} />
          </Fragment>
        )}
      >
        <GrowFrame
          id="live-preview-iframe"
          defaultHeight={'400px'}
          src={previewUrl}
        />
      </ExampleWrapper>
    </dialog>
  );

  return (
    <>
      {expandedExampleMarkup}
      <Stack gap="2" className={styles.SpecificityBuster}>
        {exampleMarkup}
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
      </Stack>
    </>
  );
};

export default PatternsExample;
