import React, {useEffect, useState, useRef} from 'react';
import {Tab} from '@headlessui/react';

import Link from 'next/link';
import {useRouter} from 'next/router';

import {HowItHelps, UsefulToKnow} from './Blocks';
import StatusBadge from '../StatusBadge';
import {
  StatusName,
  PatternFrontMatter,
  Pattern,
  PatternVariant,
  MultiVariantPattern,
  SingleVariantPattern,
} from '../../types';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Box} from '../Box';
import {Lede} from '../Lede';
import {Heading} from '../Heading';

import PatternsExample from '../PatternsExample';
import Page from '../Page';
import styles from './PatternPage.module.scss';
import Markdown from '../Markdown';
import PatternsRelatedResources from '../PatternsRelatedResources';

// TODO: Pull this from the markdown file
const isBeta = false;

interface Props extends PatternFrontMatter {
  pattern: Pattern;
}

interface PatternTabsProps {
  pattern: MultiVariantPattern;
  children: ({variant}: {variant: PatternVariant}) => React.ReactNode;
}
function PatternTabs({pattern, children}: PatternTabsProps) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const {query, replace, isReady} = useRouter();
  const onTabChange = (index: number) => {
    setExampleIndex(index);
    replace(
      {
        query: {
          ...query,
          tab: pattern.variants[index].slug,
        },
      },
      undefined,
      {shallow: true},
    );
  };
  useEffect(() => {
    // We don't expect query.tab to ever be an array of values
    // However this is supported by the spec
    // So we exclude this case in our check.
    if (query.tab && typeof query.tab === 'string' && isReady) {
      const index = pattern.variants.findIndex(
        (variant) => variant.slug === query.tab,
      );
      setExampleIndex(index);
    }
  }, [query.tab, isReady, pattern.variants]);

  useEffect(() => {
    setExampleIndex(0);
  }, []);
  return (
    <Tab.Group
      defaultIndex={0}
      selectedIndex={exampleIndex}
      onChange={onTabChange}
    >
      <div className={styles.TabGroup} data-selected={exampleIndex}>
        <Tab.List className={styles.ExamplesList} id="examples">
          {pattern.variants.map((variant) => (
            <Tab key={`${variant.slug}-tab`}>
              <span>{variant.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {pattern.variants.map((variant) => {
            return (
              <Tab.Panel key={`${variant.slug}-panel`} className={styles.Panel}>
                {children({variant})}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}

function PatternPageContent({
  patternName,
  description,
  howItHelps,
  example,
  usefulToKnow,
  onCodeToggle,
  showCode,
}: Pick<
  PatternVariant,
  'howItHelps' | 'example' | 'usefulToKnow' | 'description'
> & {
  patternName: string;
  onCodeToggle: () => void;
  showCode: boolean;
}) {
  return (
    <Stack gap="8">
      {description ? (
        <Markdown
          components={{
            p: (props) => (
              <Box as="p" className={styles.VariantDescription} {...props} />
            ),
          }}
        >
          {description}
        </Markdown>
      ) : null}
      <Stack as="section" gap="4" className={styles.MerchantGoal}>
        <Heading as="h2" id="how-it-helps-merchants">
          How it helps merchants
        </Heading>
        <HowItHelps>{howItHelps}</HowItHelps>
      </Stack>
      <Stack as="section" gap="4">
        <Heading as="h2" id="using-this-pattern">
          Using this pattern
        </Heading>
        <PatternsExample
          example={example}
          showCode={showCode}
          onCodeToggle={onCodeToggle}
          patternName={patternName}
        />
      </Stack>
      <Stack as="section" gap="4" className={styles.UsefulToKnow}>
        <Heading as="h3" className={styles.UsefulHeading} id="useful-to-know">
          Useful to know
        </Heading>
        <UsefulToKnow>{usefulToKnow}</UsefulToKnow>
      </Stack>
    </Stack>
  );
}

export default function PatternPage({pattern, ...props}: Props) {
  const [showCode, toggleCode] = useState(true);
  useEffect(() => {
    // When rendering a new pattern, default the code to visible.
    // However, when moving between variants within a pattern, retain the
    // current code toggle setting.
    toggleCode(true);
  }, [pattern]);
  return (
    <>
      <PageMeta title={props.title} description={pattern.description} />
      <Page isContentPage>
        <Stack gap="8">
          <Stack gap="4">
            <Heading as="h1">
              <Row wrap gap="2" className={styles.Heading}>
                {props.title}{' '}
                {isBeta ? (
                  <StatusBadge status={{value: StatusName.Beta, message: ''}} />
                ) : null}
              </Row>
            </Heading>
            <Lede>{pattern.description}</Lede>
            {props.githubDiscussionsLink ? (
              <p className={styles.InfoLine}>
                <Link
                  className={styles.InfoLineLink}
                  href={props.githubDiscussionsLink}
                >
                  Discuss on GitHub
                </Link>
              </p>
            ) : null}
          </Stack>
          {'variants' in pattern ? (
            <PatternTabs pattern={pattern as MultiVariantPattern}>
              {({variant}) => (
                <PatternPageContent
                  patternName={`${props.title} > ${variant.title}`}
                  description={variant.description}
                  example={variant.example}
                  howItHelps={variant.howItHelps}
                  usefulToKnow={variant.usefulToKnow}
                  showCode={showCode}
                  onCodeToggle={() => toggleCode((showCode) => !showCode)}
                />
              )}
            </PatternTabs>
          ) : (
            <Stack gap="8">
              <PatternPageContent
                patternName={props.title}
                howItHelps={(pattern as SingleVariantPattern).howItHelps}
                usefulToKnow={(pattern as SingleVariantPattern).usefulToKnow}
                example={(pattern as SingleVariantPattern).example}
                showCode={showCode}
                onCodeToggle={() => toggleCode((showCode) => !showCode)}
              />
            </Stack>
          )}

          <PatternsRelatedResources>
            {pattern.relatedResources}
          </PatternsRelatedResources>
        </Stack>
      </Page>
    </>
  );
}
