import {useEffect, useRef, useState} from 'react';
import {createUrl} from 'playroom';
import {Tab} from '@headlessui/react';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './loading.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import Button from '../../../../../src/components/Button';
import {useRouter} from 'next/router';

import SandboxContainer from '../../../../../src/components/SandboxContainer';
import ComponentExamples from '../../../ComponentExamples';
import Code from '../../../Code';

const codeExamples = [
  {
    name: 'Index skeleton page',
    code: `<SkeletonPage primaryAction>
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card>
          <Card.Section>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </TextContainer>
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText lines={1} />
          </Card.Section>
        </Card>
        <Card subdued>
          <Card.Section>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </TextContainer>
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText lines={2} />
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  </SkeletonPage>`,
  },
  {
    name: 'Detail view skeleton page',
    code: `<SkeletonPage title="Products" primaryAction>
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
        <Card sectioned title="Images">
          <SkeletonBodyText />
        </Card>
        <Card sectioned title="Variants">
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card title="Sales channels">
          <Card.Section>
            <SkeletonBodyText lines={2} />
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText lines={1} />
          </Card.Section>
        </Card>
        <Card title="Organization" subdued>
          <Card.Section>
            <SkeletonBodyText lines={2} />
          </Card.Section>
          <Card.Section>
            <SkeletonBodyText lines={2} />
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  </SkeletonPage>`,
  },
  {
    name: 'Generic skeleton page',
    code: '<div>Oopsies not a skeleton</div>',
  },
];

export default function LoadingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [codeExample, setCodeExample] = useState(codeExamples[0]);
  const [iframeHeight, setIframeHeight] = useState('400px');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      if (!iframeRef?.current) return;
      const exampleIframeDOM = iframeRef.current?.contentDocument;
      const exampleWrapper = exampleIframeDOM?.body;
      console.log({height: exampleIframeDOM?.body.scrollHeight});

      const iframePadding = 0;

      if (exampleWrapper) {
        const newHeight = `${iframePadding + exampleWrapper.scrollHeight}px`;
        setIframeHeight(newHeight);
        // setHTMLCode(formatHTML(exampleWrapper.innerHTML));
        clearInterval(waitForExampleContentToRender);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  const router = useRouter();
  const searchValue = useRef('');

  useEffect(() => {
    /**
     * We want to mirror the iframes url in the parent (aka browser) to support URL sharing.
     * the iframes onload handler isn't invoked when the iframes url changes so we're polling here instead.
     */
    const iframeUrlPoll = setInterval(() => {
      if (
        iframeRef?.current?.contentWindow &&
        iframeRef.current.contentWindow.location.search !== searchValue.current
      ) {
        searchValue.current = iframeRef.current.contentWindow.location.search;
        const iframeQueryObj = Object.fromEntries(
          new URLSearchParams(searchValue.current),
        );

        console.log(iframeQueryObj);
      }
    }, 200);
    return () => clearInterval(iframeUrlPoll);
  }, [router]);

  return (
    <Page title="Navigating to a new page">
      <div>Status: Great</div>
      <a href="#">GitHub discussions</a>
      <Longform>
        <Tab.Group
          defaultIndex={0}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <Tab.List>
            <div className={styles.ExamplesList} id="examples">
              <Tab key="UX">
                <span>UX</span>
              </Tab>
              <Tab key="BUILD">
                <span>BUILD</span>
              </Tab>
              <Tab key="SHOWCASE">
                <span>SHOWCASE</span>
              </Tab>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <Markdown
                  text={`
## Merchant insight

Merchants typically have a specific goal in mind when navigating to a new page. The loading experience should provide an accurate preview of the page, so that merchants can anticipate what’s to come and stay focused on the goal.
                  `}
                />
                <div>[Preview slideshow]</div>
                <Markdown
                  text={`
## Merchant preferences

- <details><summary>Loading state layouts that match the pages' layouts</summary>
  Hello world
  </details>
- <details><summary>Placeholder content that makes loading content clear</summary>
  Hello world
  </details>
- <details><summary>Having button and controls interactive during loading</summary>
  Hello world
  </details>
- <details><summary>Getting spinners only when really needed</summary>
  Hello world
  </details>
- <details><summary>Seeing a lot of static content in the loading state</summary>
  Hello world
  </details>
                  `}
                />
              </Tab.Panel>
              <Tab.Panel>
                {/* <ComponentExamples examples={pattern}/> */}
                {/* REPLACE THESE TABS LATER */}
                <div className={styles.codeExampleButtons}>
                  {codeExamples.map((example, index) => (
                    <Button
                      key={example.name}
                      pill
                      primary={codeExample.name === codeExamples[index].name}
                      onClick={() => {
                        setCodeExample(example);
                      }}
                    >
                      {example.name}
                    </Button>
                  ))}
                </div>
                <iframe
                  id="pattern-iframe"
                  ref={iframeRef}
                  height={iframeHeight}
                  onLoad={handleExampleLoad}
                  style={{
                    border: 0,
                    padding: 0,
                    margin: 0,
                  }}
                  src={`/playroom/preview/index.html${createUrl({
                    code: codeExample.code,
                    paramType: 'search',
                  })}`}
                  width="100%"
                />
                <Code
                  code={[
                    {
                      title: 'React',
                      code: codeExample.code,
                    },
                    // {title: 'HTML', code: htmlCode},
                  ]}
                />
              </Tab.Panel>
              <Tab.Panel>showcase</Tab.Panel>
            </Tab.Panels>
          </Tab.List>
        </Tab.Group>
      </Longform>
    </Page>
  );
}
