'use client';

import Banner from '@/components/Banner';
import Code from '@/components/Code';
import Markdown from '@/components/Markdown';
import {Tab, Tabs} from '@/components/Tabs';
import {Tab as HeadlessTab} from '@headlessui/react';
import {ComponentsPageMeta} from '@/types';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import {className} from '@/utils';

const exampleIframeId = 'example-iframe';

export default function ComponentMeta({
  excerpt,
  pageMeta,
  codeExamples,
}: {
  excerpt: string;
  pageMeta: ComponentsPageMeta;
  codeExamples: {[fileName: string]: string};
}) {
  const [htmlCode, setHTMLCode] = useState('');
  const [backgroundTheme, setBackgroundTheme] = useState<'light' | 'dark'>(
    'light',
  );

  const handleExampleLoad = () => {
    const exampleIframe = document.getElementById(
      exampleIframeId,
    ) as HTMLIFrameElement;
    const exampleIframeDOM = exampleIframe?.contentDocument;
    const exampleWrapper = exampleIframeDOM?.getElementById('polaris-example');

    if (exampleWrapper) {
      setHTMLCode(formatHTML(exampleWrapper.innerHTML));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleExampleLoad, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className={styles.ExcerptWrapper}>
        <Markdown>{excerpt}</Markdown>
      </div>

      {pageMeta.lifeCycleNotice && (
        <Banner
          title={pageMeta.lifeCyclePhase}
          markdownContent={pageMeta.lifeCycleNotice}
        />
      )}

      <Tabs
        tabs={pageMeta.examples.map((example) => example.title)}
        boxed={false}
      >
        {pageMeta.examples.map((example) => {
          const reactCode = codeExamples[example.fileName];
          const iframeSrc = `/examples/${example.fileName.replace('.tsx', '')}`;
          return (
            <Tab key={example.title}>
              <div className={styles.ExampleDescription}>
                <Markdown>{example.description}</Markdown>
              </div>

              <div className={styles.ExampleContainer}>
                <HeadlessTab.Group
                  onChange={(index) =>
                    setBackgroundTheme(index === 0 ? 'light' : 'dark')
                  }
                >
                  <HeadlessTab.List className={styles.ExampleTabs}>
                    <HeadlessTab>Preview</HeadlessTab>
                    {reactCode && <HeadlessTab>React</HeadlessTab>}
                    <HeadlessTab>HTML</HeadlessTab>
                  </HeadlessTab.List>

                  <HeadlessTab.Panels
                    className={className(
                      styles.ExampleIframe,
                      backgroundTheme === 'light'
                        ? styles.isLight
                        : styles.isDark,
                    )}
                  >
                    <HeadlessTab.Panel
                      as="iframe"
                      id={exampleIframeId}
                      src={iframeSrc}
                      onLoad={handleExampleLoad}
                    ></HeadlessTab.Panel>
                    {reactCode && (
                      <HeadlessTab.Panel className={styles.Code}>
                        <Code
                          code={[
                            {
                              title: 'React',
                              code: reactCode,
                            },
                          ]}
                        />
                      </HeadlessTab.Panel>
                    )}
                    <HeadlessTab.Panel className={styles.Code}>
                      <Code
                        code={[
                          {
                            title: 'HTML',
                            code: htmlCode,
                          },
                        ]}
                      />
                    </HeadlessTab.Panel>
                  </HeadlessTab.Panels>
                </HeadlessTab.Group>
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
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
