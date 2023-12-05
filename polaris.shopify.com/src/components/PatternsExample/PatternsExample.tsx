import {Fragment, useRef, useEffect, useState, useCallback} from 'react';
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
import {viewTransition} from '../../utils/various';
import {MaximizeMinor, MinimizeMinor} from '@shopify/polaris-icons';
import Icon from '../Icon';

const getISOStringYear = () => new Date().toISOString().split('T')[0];

const PlayroomButton = ({code, title}: {code: string; title?: string}) => {
  const [encodedUrl, setEncodedUrl] = useState('');
  useEffect(() => {
    setEncodedUrl(
      createUrl({
        baseUrl: '/sandbox/',
        code: endent`
          ${title ? `{/* ${title} */}` : ''}
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
  }, [code, title]);

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
  title,
  isCodeVisible = false,
  isActionsVisible = true,
  defaultHeight = '400px',
  minHeight = '1rem',
  onCodeVisibilityToggle,
}: {
  example: PatternExample;
  title?: string;
  isCodeVisible?: boolean;
  isActionsVisible?: boolean;
  defaultHeight?: string;
  minHeight?: string;
  onCodeVisibilityToggle?: () => void;
}) => {
  const expandedPreviewRef: React.RefObject<HTMLDialogElement> = useRef(null);
  const previewRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [codeActive, toggleCode] = useState(false);
  const [dialogActive, toggleDialog] = useState(false);

  const isControlled = typeof isCodeVisible === 'undefined';
  const showCodeValue = isControlled ? codeActive : isCodeVisible;

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
    if (onCodeVisibilityToggle) onCodeVisibilityToggle();
    if (isControlled) {
      toggleCode((codeActive) => !codeActive);
    }
  };

  const handleMaximize = async () => {
    const dialog = expandedPreviewRef.current;
    const preview = previewRef.current;

    if (preview) {
      // @ts-ignore
      preview.style.viewTransitionName = 'dialog';
    }

    const maximize = viewTransition(() => {
      if (dialog) {
        handleScrollLock(true);
        toggleDialog(true);
        dialog.showModal();
      }

      if (preview) {
        // @ts-ignore
        preview.style.viewTransitionName = '';
      }
    });

    await maximize.finished;
  };

  const handleMinimize = useCallback(async () => {
    const dialog = expandedPreviewRef.current;
    const preview = previewRef.current;

    try {
      const minimize = viewTransition(() => {
        if (dialog) {
          handleScrollLock(false);
          toggleDialog(false);
          dialog.close();

          if (preview) {
            // @ts-ignore
            preview.style.viewTransitionName = 'dialog';
          }
        }
      });

      await minimize.finished;
    } finally {
      if (preview) {
        // @ts-ignore
        preview.style.viewTransitionName = '';
      }
    }
  }, []);

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

  const exampleMarkup = (
    <ExampleWrapper
      ref={previewRef}
      className={classNames(styles.ExampleWrapper)}
      renderFrameActions={
        isActionsVisible
          ? () => (
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
                  <Icon source={MaximizeMinor} />
                </LinkButton>
                <PlayroomButton code={sandboxCode} title={title} />
                <LinkButton onClick={handleCodeToggle}>
                  {showCodeValue ? 'Hide code' : 'Show code'}
                </LinkButton>
              </Fragment>
            )
          : undefined
      }
    >
      <GrowFrame
        id="live-preview-iframe"
        defaultHeight={'400px'}
        src={previewUrl}
        sandbox="allow-scripts"
      />
    </ExampleWrapper>
  );

  const expandedExampleMarkup = (
    <dialog
      ref={expandedPreviewRef}
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
            <PlayroomButton code={sandboxCode} title={title} />
          </Fragment>
        )}
      >
        <GrowFrame
          id="live-preview-iframe"
          defaultHeight={defaultHeight}
          minHeight={minHeight}
          src={previewUrl}
          sandbox="allow-scripts"
        />
      </ExampleWrapper>
    </dialog>
  );

  return (
    <>
      {expandedExampleMarkup}
      <Stack gap="200" className={styles.SpecificityBuster}>
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
