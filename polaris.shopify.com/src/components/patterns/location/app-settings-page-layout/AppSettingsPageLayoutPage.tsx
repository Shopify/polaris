import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createUrl} from 'playroom';
import {Tab} from '@headlessui/react';
import {MaximizeMajor} from '@shopify/polaris-icons';
import {Icon, Stack, Text} from '@shopify/polaris';
import Longform from '../../../Longform';
import Page from '../../../Page';
import styles from './AppSettingsPageLayoutPage.module.scss';
import Markdown from '../../../../../src/components/Markdown';
import {playroom} from '../../../../../constants';
import LinkButton from '../../loading/new-page/LinkButton';
import GrowFrame from '../../../GrowFrame';
import Code from '../../../Code';
import ExampleWrapper from '../../../ExampleWrapper/ExampleWrapper';

type PatternExample = {
  title: string;
  code: string;
  description?: string;
  supportsAppBridge?: boolean;
};
const codeExamples: PatternExample[] = [
  {
    title: 'with context',
    code: `

    <Frame
  navigation={<Navigation location="/"></Navigation>}
  topBar={<TopBar />}
>
  <ContextualSaveBar
    message="Settings"
    saveAction={{
      content: "Save",
      onAction: () => {},
    }}
    discardAction={{
      content: "Discard",
      onAction: () => {},
    }}
  />
  <Page
    divider
    primaryAction={{ content: "View on your store", disabled: true }}
    secondaryActions={[
      {
        content: "Duplicate",
        accessibilityLabel: "Secondary action label",
        onAction: () => alert("Duplicate action"),
      },
    ]}
  >
    <AlphaStack gap="16">
      <Columns columns={{ xs: "1fr", sm: "2fr 5fr" }}>
        <Box as="section">
          <AlphaStack>
            <Text as="h3" variant="headingMd">
              InterJambs
            </Text>
            <Text as="p" variant="bodyMd">
              Interjambs are the rounded protruding bits of your puzzlie piece
            </Text>
          </AlphaStack>
        </Box>
        <AlphaCard>
          <AlphaStack fullWidth>
            <TextField label="Interjamb style" />
            <TextField label="Interjamb ratio" />
          </AlphaStack>
        </AlphaCard>
      </Columns>
      <Columns columns={{ xs: "1fr", sm: "2fr 5fr" }}>
        <Box as="section">
          <AlphaStack>
            <Text as="h3" variant="headingMd">
              Dimensions
            </Text>
            <Text as="p" variant="bodyMd">
              Interjambs are the rounded protruding bits of your puzzlie piece
            </Text>
          </AlphaStack>
        </Box>
        <AlphaCard>
          <AlphaStack fullWidth>
            <TextField label="Horizontal" />
            <TextField label="Interjamb ratio" />
          </AlphaStack>
        </AlphaCard>
      </Columns>
    </AlphaStack>
  </Page>
</Frame>`,
  },
  {
    title: 'Without Frame',
    code: ` <Page
    divider
    primaryAction={{ content: "View on your store", disabled: true }}
    secondaryActions={[
      {
        content: "Duplicate",
        accessibilityLabel: "Secondary action label",
        onAction: () => alert("Duplicate action"),
      },
    ]}
  >
    <AlphaStack gap="16">
      <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
        <Box as="section">
          <AlphaStack>
            <Text as="h3" variant="headingMd">
              InterJambs
            </Text>
            <Text as="p" variant="bodyMd">
              Interjambs are the rounded protruding bits of your puzzlie piece
            </Text>
          </AlphaStack>
        </Box>
        <AlphaCard>
          <AlphaStack fullWidth>
            <TextField label="Interjamb style" />
            <TextField label="Interjamb ratio" />
          </AlphaStack>
        </AlphaCard>
      </Columns>
      <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
        <Box as="section">
          <AlphaStack>
            <Text as="h3" variant="headingMd">
              Dimensions
            </Text>
            <Text as="p" variant="bodyMd">
              Interjambs are the rounded protruding bits of your puzzlie piece
            </Text>
          </AlphaStack>
        </Box>
        <AlphaCard>
          <AlphaStack fullWidth>
            <TextField label="Horizontal" />
            <TextField label="Interjamb ratio" />
          </AlphaStack>
        </AlphaCard>
      </Columns>
    </AlphaStack>
  </Page>`,
  },
  {
    title: 'Minimal',
    code: `
    <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
    <Box as="section">
      <AlphaStack>
        <Text as="h3" variant="headingMd">
          InterJambs
        </Text>
        <Text as="p" variant="bodyMd">
          Interjambs are the rounded protruding bits of your puzzlie piece
        </Text>
      </AlphaStack>
    </Box>
    <AlphaCard>
      <AlphaStack fullWidth>
        <TextField label="Interjamb style" />
        <TextField label="Interjamb ratio" />
      </AlphaStack>
    </AlphaCard>
  </Columns>
    `,
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
  const srcUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedCode = createUrl({
    baseUrl: playroom.baseUrl,
    code: `// [Polaris Pattern] ${patternName}
// Generated on ${getISOStringYear()} from ${srcUrl}
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

const Example = ({
  example,
  patternName,
}: {
  example: PatternExample;
  patternName: string;
}) => {
  const [codeActive, toggleCode] = useState(false);
  const [htmlCode, setHTMLCode] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isAdminFrameVisible, setAdminFrameVisible] = useState<boolean>(false);

  const onFrameToggle = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      setAdminFrameVisible(!!event.currentTarget.checked);
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          setFrameVisible: !!event.currentTarget.checked,
        });
      }
    },
    [],
  );

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

  const exampleUrl = `/app-emulator${createUrl({
    code: example.code,
    paramType: 'search',
  })}`;
  const {code, description} = example;

  return (
    <>
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
              <Text variant="bodySm" as="span" visuallyHidden>
                View fullscreen preview
              </Text>
              <Icon source={MaximizeMajor} />
            </a>
            <PlayroomButton
              code={example.code}
              patternName={`${patternName} > ${example.title}`}
            />
            <LinkButton onClick={() => toggleCode((codeActive) => !codeActive)}>
              {codeActive ? 'Hide code' : 'Show code'}
            </LinkButton>
            {example.supportsAppBridge ? (
              <label>
                <input
                  type="checkbox"
                  className={styles.Checkbox}
                  checked={isAdminFrameVisible}
                  onChange={onFrameToggle}
                />
                Show Admin
              </label>
            ) : null}
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
    </>
  );
};

export default function AppSettingsPageLayoutPage() {
  const patternName = 'App settings page layout';
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    setExampleIndex(0);
  }, []);

  return (
    <Page title={patternName}>
      <Stack vertical>
        <Text as="p" variant="bodyLg">
          This layout pattern makes it easy for merchants to scan groups of
          <br />
          settings and make desired changes
        </Text>
        <Text as="p" variant="bodySm">
          Maintainer: Polaris * <a href="#">Discuss on Github</a>
        </Text>
      </Stack>
      <Longform>
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
            {codeExamples.map((example, i) => (
              <Tab.Panel key={i}>
                <Example example={example} patternName={patternName} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <h2>Merchant Goal</h2>
        <p>
          This layout has two columnns, with guidance to the left and settings
          in cards to the right
        </p>
        <ol>
          <li>
            The left columns make it easy for merchants to glance the group
            names and scan the page
          </li>
          <li>
            When the desired group is found, merchants move their gaze to the
            right and complete their task.
          </li>
        </ol>
        <Text as="h2" variant="heading2xl">
          Usage Guidance
        </Text>
        <details className={styles.Accordion}>
          <summary>Common pattern tweaks</summary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </details>
        <details className={styles.Accordion}>
          <summary>Platform considerations</summary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </details>
        <details className={styles.Accordion}>
          <summary>Using App Bridge</summary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </details>
      </Longform>
    </Page>
  );
}
