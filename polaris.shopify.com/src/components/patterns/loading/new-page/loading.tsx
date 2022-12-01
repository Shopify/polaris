import {useEffect, useRef, useState} from 'react';
import {createUrl} from 'playroom';
import {Tab} from '@headlessui/react';
import {MaximizeMajor} from '@shopify/polaris-icons';
import {Icon, Text} from '@shopify/polaris';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './loading.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import {playroom} from '../../../../../constants';
import LinkButton from './LinkButton';
import GrowFrame from '../../../GrowFrame';
import Code from '../../../Code';
import ExampleWrapper from '../../../ExampleWrapper/ExampleWrapper';

type PatternExample = {
  title: string;
  code: string;
  description?: string;
};
const codeExamples: PatternExample[] = [
  {
    title: 'Index skeleton page',
    code: `

    <SkeletonPage primaryAction>
    <AppBridgeLoading loading/>
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
    <ContextualSaveBar visible/>
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

export default function LoadingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const patternName = 'Navigating to a new page';
  const [exampleIndex, setExampleIndex] = useState(0);
  const [codeActive, toggleCode] = useState(false);
  const [htmlCode, setHTMLCode] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleExampleLoad = () => {
    const iframeDocument = iframeRef.current?.contentDocument;
    if (iframeDocument) {
      const html = (
        iframeDocument?.getElementById('app-iframe') as HTMLIFrameElement
      )?.contentDocument?.getElementById('polaris-sandbox-wrapper')?.innerHTML;
      if (html) {
        setHTMLCode(formatHTML(html));
      }
    }
  };
  useEffect(() => {
    setExampleIndex(0);
  }, []);

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
                <Tab.Group
                  defaultIndex={0}
                  selectedIndex={exampleIndex}
                  onChange={setExampleIndex}
                >
                  <Tab.List>
                    <div className={styles.ExamplesList} id="examples">
                      {codeExamples.map((example, i) => {
                        return (
                          <Tab key={i}>
                            <span>{example.title}</span>
                          </Tab>
                        );
                      })}
                    </div>
                  </Tab.List>

                  <Tab.Panels>
                    {codeExamples.map((example) => {
                      const exampleUrl = `/app-emulator${createUrl({
                        code: example.code,
                        paramType: 'search',
                      })}`;
                      const {code, description} = example;

                      return (
                        <Tab.Panel key={exampleUrl}>
                          {description ? <Markdown text={description} /> : null}
                          <ExampleWrapper
                            renderFrameActions={() => (
                              <>
                                <a
                                  target="_blank"
                                  href={`/app-emulator${createUrl({
                                    code: example.code,
                                    paramType: 'search',
                                  })}`}
                                  rel="noreferrer"
                                >
                                  <Text
                                    variant="bodySm"
                                    as="span"
                                    visuallyHidden
                                  >
                                    View fullscreen preview
                                  </Text>
                                  <Icon source={MaximizeMajor} />
                                </a>
                                <PlayroomButton
                                  code={example.code}
                                  patternName={`${patternName} > ${example.title}`}
                                />
                                <LinkButton
                                  onClick={() =>
                                    toggleCode((codeActive) => !codeActive)
                                  }
                                >
                                  {codeActive ? 'Hide code' : 'Show code'}
                                </LinkButton>
                              </>
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
                          {codeActive ? (
                            <Code
                              code={[
                                {title: 'React', code: code.trim()},
                                {title: 'HTML', code: htmlCode},
                              ]}
                            />
                          ) : null}
                        </Tab.Panel>
                      );
                    })}
                  </Tab.Panels>
                </Tab.Group>
                <Text as="h2" variant="heading2xl">
                  Usage Guidance
                </Text>
                <details className={styles.Accordion}>
                  <summary>Common pattern tweaks</summary>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </details>
                <details className={styles.Accordion}>
                  <summary>Platform considerations</summary>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </details>
                <details className={styles.Accordion}>
                  <summary>Using App Bridge</summary>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </details>
              </Tab.Panel>
              <Tab.Panel>showcase</Tab.Panel>
            </Tab.Panels>
          </Tab.List>
        </Tab.Group>
      </Longform>
    </Page>
  );
}
