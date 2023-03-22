import {useEffect, useState} from 'react';
import {type SerializedMdx} from '../Markdown/serialize';
import styles from './ComponentExamples.module.scss';
import CodesandboxButton from '../CodesandboxButton';
import Code from '../Code';
import {Tab} from '@headlessui/react';
import {className} from '../../utils/various';
import Markdown from '../Markdown';
import GrowFrame from '../GrowFrame';

const exampleIframeId = 'example-iframe';

export type ComponentExample = {
  code: string;
  description: string;
  fileName: string;
  title: string;
};

export type ComponentExampleSerialized = {
  code: string;
  description: SerializedMdx;
  fileName: string;
  title: string;
};

interface Props {
  examples: ComponentExampleSerialized[];
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

  const handleExampleLoad = (iframeEl: HTMLIFrameElement) => {
    const exampleIframeDOM = iframeEl.contentDocument;
    const exampleWrapper = exampleIframeDOM?.getElementById('polaris-example');

    if (exampleWrapper) {
      setHTMLCode(formatHTML(exampleWrapper.innerHTML));
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

          if (description) {
            console.log('ComponentExamples.description', description);
          }

          return (
            <Tab.Panel key={fileName}>
              {description ? <Markdown {...description} /> : null}
              <div className={styles.ExampleFrame}>
                <GrowFrame
                  defaultHeight={'400px'}
                  src={exampleUrl}
                  onContentLoad={handleExampleLoad}
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
  );
};

export default ComponentExamples;
