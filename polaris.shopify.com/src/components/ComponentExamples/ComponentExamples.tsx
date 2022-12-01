import {useEffect, useRef, useState} from 'react';
import GrowFrame from '../GrowFrame';
import styles from './ComponentExamples.module.scss';
import Code from '../Code';
import {Tab} from '@headlessui/react';
import Markdown from '../Markdown';
import ExampleWrapper from '../ExampleWrapper';
import CodesandboxButton from '../CodesandboxButton';

export interface Example {
  code: string;
  description?: string;
  title: string;
  fileName: string;
}

interface Props {
  examples: Example[];
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    const iframeDocument = iframeRef.current?.contentDocument;
    if (iframeDocument) {
      const html = iframeDocument?.getElementById('polaris-example')?.innerHTML;
      if (html) {
        setHTMLCode(formatHTML(html));
      }
    }
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
        {examples.map((example) => {
          const exampleUrl = `/examples/${example.fileName.replace(
            '.tsx',
            '',
          )}`;
          const {code, description} = example;

          return (
            <Tab.Panel key={exampleUrl}>
              {description ? <Markdown text={description} /> : null}
              <ExampleWrapper
                renderFrameActions={() => (
                  <CodesandboxButton code={example.code} />
                )}
              >
                <GrowFrame
                  ref={iframeRef}
                  id="live-preview-iframe"
                  defaultHeight={'192px'}
                  onContentLoad={handleExampleLoad}
                  src={exampleUrl}
                />
              </ExampleWrapper>
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
