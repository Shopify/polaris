import {useEffect, useState} from 'react';
import styles from './ComponentExamples.module.scss';
import CodesandboxButton from '../CodesandboxButton';
import Code from '../Code';
import {Tab} from '@headlessui/react';
import {className} from '../../utils/various';
import Markdown from '../Markdown';

const exampleIframeId = 'example-iframe';
const iframePadding = 192;

export type ComponentExample = {
  code: string;
  description: string;
  fileName: string;
  title: string;
};

interface Props {
  examples: ComponentExample[];
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

const ComponentExamples = ({examples}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [htmlCode, setHTMLCode] = useState('');

  const [iframeHeight, setIframeHeight] = useState(400);

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        exampleIframeId,
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper =
        exampleIframeDOM?.getElementById('polaris-example');

      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        setIframeHeight(newHeight);
        setHTMLCode(formatHTML(exampleWrapper.innerHTML));
        clearInterval(waitForExampleContentToRender);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [examples]);

  return (
    <>
      <h2 id="examples">Examples</h2>

      <Tab.Group
        defaultIndex={0}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <Tab.List>
          <div className={styles.ExamplesList}>
            {examples.map((example) => {
              return (
                <Tab key={example.fileName}>
                  <span>{example.title}</span>
                </Tab>
              );
            })}
          </div>
        </Tab.List>

        <Tab.Panels>
          {examples.map(({fileName, description, code}) => {
            const exampleUrl = `/examples/${fileName.replace('.tsx', '')}`;

            return (
              <Tab.Panel key={fileName}>
                {description ? <Markdown text={description} /> : null}
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
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default ComponentExamples;
