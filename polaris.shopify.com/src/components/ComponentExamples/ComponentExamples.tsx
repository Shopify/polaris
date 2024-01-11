import {useEffect, useState, useRef} from 'react';
import type {SerializedMdx} from '../../types';
import styles from './ComponentExamples.module.scss';
import CodesandboxButton from '../CodesandboxButton';
import {className as classNames} from '../../utils/various';
import Code from '../Code';
import {className} from '../../utils/various';
import Markdown from '../Markdown';
import {useRouter} from 'next/router';
import {useSearchParams} from 'next/navigation';

const exampleIframeId = 'example-iframe';
const iframePadding = 192;

export type ComponentExample = {
  code: string;
  description: string;
  fileName: string;
  title: string;
};

export type ComponentExampleSerialized = {
  code: string;
  description: SerializedMdx | null;
  fileName: string;
  title: string;
};

interface Props {
  examples: ComponentExampleSerialized[];
  componentTitle: string;
}

// https://stackoverflow.com/a/60338028
function formatHTML(html: string): string {
  const tab = '  ';
  let result = '';
  let indent = '';

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    result += indent + '<' + element + '>\r\n';

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input')) {
      indent += tab;
    }
  });

  return result.substring(1, result.length - 3);
}

const ComponentExamples = ({examples, componentTitle}: Props) => {
  const [htmlCode, setHTMLCode] = useState('');
  const [iframeHeight, setIframeHeight] = useState(400);
  const router = useRouter();
  const params = useSearchParams();

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        exampleIframeId,
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper =
        exampleIframeDOM?.getElementById('polaris-example');
      const portalsContainer = exampleIframeDOM?.getElementById(
        'PolarisPortalsContainer',
      );

      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        setIframeHeight(newHeight);
        setHTMLCode(
          formatHTML(exampleWrapper.innerHTML + portalsContainer?.innerHTML),
        );
        clearInterval(waitForExampleContentToRender);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  // get example names and index
  const defaultExampleName = examples[0].fileName.replace('.tsx', '');
  let exampleName = params.get('example') || defaultExampleName;
  let exampleFilename =
    (exampleName ? exampleName : defaultExampleName) + '.tsx';
  let exampleIndex = examples.findIndex(
    (obj) => obj.fileName === exampleFilename,
  );

  // update query param to the selected example
  const updateSelectedExample = (index: number) => {
    exampleName = examples[index].fileName.replace('.tsx', '');

    router.replace(
      {
        pathname: router.pathname,
        query: {...router.query, example: exampleName},
      },
      undefined,
      {shallow: true},
    );
  };

  // manage keyboard focus for tabs and tabpanels
  const examplesLength = examples.length - 1;

  const setSelectedToPreviousTab = () => {
    if (exampleIndex === 0) {
      setSelectedTab(examplesLength);
    } else {
      const index = exampleIndex - 1;
      setSelectedTab(index);
    }
  };

  const setSelectedToNextTab = () => {
    if (exampleIndex === examplesLength) {
      setSelectedTab(0);
    } else {
      const index = exampleIndex + 1;
      setSelectedTab(index);
    }
  };

  const setSelectedTab = (index: number) => {
    exampleIndex = index;
    updateSelectedExample(index);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        setSelectedToPreviousTab();
        break;

      case 'ArrowRight':
        setSelectedToNextTab();
        break;

      case 'Home':
        setSelectedTab(0);
        break;

      case 'End':
        setSelectedTab(examplesLength);
        break;

      default:
        break;
    }
  };

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, examples.length);
  }, [examples]);

  useEffect(() => {
    const currentButtonRef = buttonRefs.current[exampleIndex];
    if (currentButtonRef) {
      currentButtonRef.focus();
    }
  }, [exampleIndex]);

  const tablistId = 'component-examples-tablist';

  const tabButtons = examples.map((example, index) => {
    return (
      <button
        role="tab"
        type="button"
        id={`tab-${index}`}
        key={example.fileName}
        onClick={() => updateSelectedExample(index)}
        aria-controls={`tabpanel-${index}`}
        tabIndex={index === exampleIndex ? 0 : -1}
        ref={(el) => (buttonRefs.current[index] = el)}
        aria-selected={index === exampleIndex}
      >
        <span>{example.title}</span>
      </button>
    );
  });

  const examplesMarkup = examples.map(
    ({fileName, description, code}, index) => {
      const exampleUrl = `/examples/${fileName.replace('.tsx', '')}`;
      const isSelected = index === exampleIndex ? true : false;
      const classes = classNames(
        styles.Tab,
        isSelected ? styles.selected : undefined,
      );

      return (
        <div
          id={`tabpanel-${index}`}
          key={fileName}
          role="tabpanel"
          tabIndex={0}
          className={classes}
          aria-labelledby={`tab-${index}`}
        >
          {description ? <Markdown {...description} /> : null}
          <div className={styles.ExampleFrame}>
            <iframe
              src={exampleUrl}
              height={iframeHeight}
              onLoad={handleExampleLoad}
              id={exampleIframeId}
            />
            <div className={className(styles.Buttons, 'light-mode')}>
              <CodesandboxButton
                className={styles.CodesandboxButton}
                code={code}
              />
            </div>
          </div>

          <Code
            code={[
              {title: 'React', code: code.trim()},
              {title: 'HTML', code: htmlCode},
            ]}
          />
        </div>
      );
    },
  );

  return (
    <>
      <h3 id={tablistId} className="visuallyHidden">
        {componentTitle} component examples
      </h3>
      <div
        aria-labelledby={tablistId}
        className={styles.ExamplesList}
        id="examples"
        role="tablist"
        onKeyDown={onKeyDownHandler}
      >
        {tabButtons}
      </div>
      {examplesMarkup[exampleIndex]}
    </>
  );
};

export default ComponentExamples;
