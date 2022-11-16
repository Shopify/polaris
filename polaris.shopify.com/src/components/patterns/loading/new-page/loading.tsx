import {useEffect, useRef, useState} from 'react';
import {createUrl} from 'playroom';
import {Tab} from '@headlessui/react';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './loading.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import {useRouter} from 'next/router';
import ComponentExamples, {type Example} from '../../../ComponentExamples';

const codeExamples: Example[] = [
  {
    title: 'Index skeleton page',
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
    title: 'Detail view skeleton page',
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
    title: 'Generic skeleton page',
    code: '<div>Oopsies not a skeleton</div>',
  },
];

// const PlayroomButton = ({code}: Props) => {
//   const {code} = props;

//   const encodedCode = createUrl({
//     baseUrl: playroom.baseUrl,
//     code: getAppCode(code), //encodeURL(getAppCode(code));
//     themes: ['locale:en'],
//     paramType: 'search',
//   });

//   return (
//     <a
//       href={encodedCode}
//       className={styles.Link}
//       target="_blank"
//       rel="noreferrer"
//     >
//       Open in Playroom
//     </a>
//   );
// };

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
                <ComponentExamples
                  examples={codeExamples}
                  extractRenderedHTML={(iframeDoc) => iframeDoc.body.innerHTML}
                  calculateIframeHeight={(iframeDoc) =>
                    `${iframeDoc.body?.scrollHeight ?? 0}px`
                  }
                  getIframeUrl={(example) =>
                    `/playroom/preview/index.html${createUrl({
                      code: example.code,
                      paramType: 'search',
                    })}`
                  }
                  renderActions={() => 'I am an Action'}
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
