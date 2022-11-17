import {useState} from 'react';
import {createUrl} from 'playroom';
import {Tab} from '@headlessui/react';
import {MaximizeMajor} from '@shopify/polaris-icons';
import {Icon, Text} from '@shopify/polaris';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './loading.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import ComponentExamples, {type Example} from '../../../ComponentExamples';
import {playroom} from '../../../../../constants';

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

const getISOStringYear = () => new Date().toISOString().split('T')[0];

const PlayroomButton = ({
  code,
  patternName,
}: {
  code: string;
  patternName: string;
}) => {
  const encodedCode = createUrl({
    baseUrl: playroom.baseUrl,
    code: `// [Polaris Pattern] ${patternName}
// Generated on ${getISOStringYear()} from ${window.location.href}
${/* intentional blank line */ ''}
${code}`,
    // TODO: Is this correct?
    themes: ['locale:en'],
    paramType: 'search',
  });

  return (
    <a
      href={encodedCode}
      className={styles.Link}
      target="_blank"
      rel="noreferrer"
    >
      Open in Playroom
    </a>
  );
};

export default function LoadingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const patternName = 'Navigating to a new page';

  return (
    <Page title={patternName}>
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
                  extractRenderedHTML={(iframeDoc) =>
                    iframeDoc.getElementById('polaris-sandbox-wrapper')
                      ?.innerHTML
                  }
                  calculateIframeHeight={(iframeDoc) =>
                    `${iframeDoc.body?.scrollHeight ?? 0}px`
                  }
                  getIframeUrl={(example) =>
                    `/playroom/preview/index.html${createUrl({
                      code: example.code,
                      paramType: 'search',
                    })}`
                  }
                  renderActions={(example) => (
                    <>
                      <PlayroomButton
                        code={example.code}
                        patternName={`${patternName} > ${example.title}`}
                      />
                      <a
                        target="_blank"
                        href={`/playroom/preview/index.html${createUrl({
                          code: example.code,
                          paramType: 'search',
                        })}`}
                        rel="noreferrer"
                      >
                        <Text variant="bodySm" as="span" visuallyHidden>
                          View fullscreen preview
                        </Text>
                        <Icon source={MaximizeMajor} />
                      </a>
                    </>
                  )}
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
