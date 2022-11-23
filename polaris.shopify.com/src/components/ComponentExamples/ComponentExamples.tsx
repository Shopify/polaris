import {useEffect, useState} from 'react';
import styles from './ComponentExamples.module.scss';
import Code from '../Code';
import {Tab} from '@headlessui/react';
import {className} from '../../utils/various';
import Markdown from '../Markdown';

const exampleIframeId = 'example-iframe';

export interface Example {
  code: string;
  description?: string;
  title: string;
}

interface Props<T> {
  examples: T[];
  // A valid css <size> applied to the iframe's .height attr
  calculateIframeHeight: (htmlDoc: Document) => string;
  extractRenderedHTML: (htmlDoc: Document) => string | undefined;
  getIframeUrl: (example: T) => string;
  renderActions: (example: T) => React.ReactNode;
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

interface GrowFrameProps extends React.HTMLProps<HTMLIFrameElement> {
  calculateIframeHeight: (htmlDoc: Document) => string;
  extractRenderedHTML: (htmlDoc: Document) => string | undefined;
  defaultHeight: string;
  id: string;
}

export const GrowFrame = ({
  id,
  extractRenderedHTML,
  calculateIframeHeight,
  defaultHeight,
  onLoad,
  ...props
}: GrowFrameProps) => {
  const [iframeHeight, setIframeHeight] = useState(defaultHeight);
  useEffect(() => {
    const messageReceiver = (e: MessageEvent) => {
      if (
        typeof e.data === 'string' &&
        e.data.includes('PLAYROOM COMPONENT LOADED') &&
        !e.data.includes(id) &&
        window.parent
      ) {
        const frameElement = document.getElementById(id) as HTMLIFrameElement;
        const iframeDocument = frameElement?.contentDocument;
        if (iframeDocument) {
          const newHeight = calculateIframeHeight(iframeDocument);
          setIframeHeight(newHeight);
        }
        window.parent.postMessage(
          `${id} PLAYROOM COMPONENT LOADED`,
          'http://localhost:3000',
        );
      }
    };
    window.addEventListener('message', messageReceiver);
    return () => {
      window.removeEventListener('message', messageReceiver);
    };
  }, []);
  return (
    <iframe
      {...props}
      height={iframeHeight}
      id={id}
      onLoad={(e) => {
        onLoad?.(e);
      }}
    />
  );
};

const ComponentExamples = <T extends Example>({
  examples,
  calculateIframeHeight,
  extractRenderedHTML,
  getIframeUrl,
  renderActions,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [htmlCode, setHTMLCode] = useState('');

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        exampleIframeId,
      ) as HTMLIFrameElement;
      const iframeDocument = exampleIframe?.contentDocument;
      if (iframeDocument) {
        const html = extractRenderedHTML(iframeDocument);
        if (html) {
          setHTMLCode(formatHTML(html));
          clearInterval(waitForExampleContentToRender);
        }
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
        console.warn('Unable to detect example iframe load completion.');
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [examples]);

  return (
    <Tab.Group
      defaultIndex={0}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <Tab.List>
        <div className={styles.ExamplesList} id="examples">
          {examples.map((example, i) => {
            return (
              <Tab key={i}>
                <span>{example.title}</span>
              </Tab>
            );
          })}
        </div>
      </Tab.List>

      <Tab.Panels>
        {examples.map((example, i) => {
          const exampleUrl = getIframeUrl(example);
          const {code, description} = example;

          return (
            <Tab.Panel key={i}>
              {description ? <Markdown text={description} /> : null}
              <div className={styles.ExampleFrame}>
                <GrowFrame
                  src={exampleUrl}
                  extractRenderedHTML={extractRenderedHTML}
                  calculateIframeHeight={calculateIframeHeight}
                  defaultHeight={'400px'}
                  onLoad={handleExampleLoad()}
                  id={exampleIframeId}
                />
                <div className={className(styles.Buttons, 'light-mode')}>
                  {renderActions(example)}
                </div>
              </div>

              <Code
                code={[
                  {title: 'React', code: code.trim()},
                  {title: 'HTML', code: htmlCode},
                ]}
              />
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ComponentExamples;
