import React, {useEffect, useState, useRef} from 'react';
import {Tab} from '@headlessui/react';

import Link from 'next/link';
import {useRouter} from 'next/router';

import {HowItHelps, UsefulToKnow} from './Blocks';
import StatusBadge from '../StatusBadge';
import {StatusName, MultiVariantPattern, PatternFrontMatter} from '../../types';
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
  pattern: MultiVariantPattern;
}

export default function PatternsDatePickingPage({pattern, ...props}: Props) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const {query, replace, isReady} = useRouter();
  const [showCode, toggleCode] = useState(false);
  const tabListRef = useRef<HTMLDivElement | null>(null);
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
  const description =
    'Lets merchants select a date or date range to help them filter information or objects and schedule events or actions.';

  useEffect(() => {
    setExampleIndex(0);
  }, []);

  return (
    <>
      <PageMeta title={props.title} description={description} />

      <Page showTOC={true}>
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
            <Lede>{description}</Lede>
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
          <Tab.Group
            defaultIndex={0}
            selectedIndex={exampleIndex}
            onChange={onTabChange}
          >
            <div className={styles.TabGroup} data-selected={exampleIndex}>
              <Tab.List ref={tabListRef}>
                <div className={styles.ExamplesList} id="examples">
                  {pattern.variants.map((variant) => (
                    <Tab
                      key={`${variant.slug}-tab`}
                      onFocus={() => {
                        if (!tabListRef.current) return;
                        tabListRef.current.scrollIntoView({
                          block: 'end',
                          inline: 'nearest',
                          behavior: 'smooth',
                        });
                      }}
                    >
                      <span>{variant.title}</span>
                    </Tab>
                  ))}
                </div>
              </Tab.List>
              <Tab.Panels>
                {pattern.variants.map((variant) => (
                  <Tab.Panel
                    key={`${variant.slug}-panel`}
                    className={styles.Panel}
                  >
                    <Stack gap="8">
                      {variant.description ? (
                        <Markdown
                          components={{
                            p: (props) => (
                              <Box
                                as="p"
                                className={styles.VariantDescription}
                                {...props}
                              />
                            ),
                          }}
                        >
                          {variant.description}
                        </Markdown>
                      ) : null}
                      <Stack
                        as="section"
                        gap="4"
                        className={styles.MerchantGoal}
                      >
                        <Heading as="h2" id="how-it-helps-merchants">
                          How it helps merchants
                        </Heading>
                        <HowItHelps>{variant.howItHelps}</HowItHelps>
                      </Stack>
                      <Stack as="section" gap="4">
                        <Heading as="h2" id="using-this-pattern">
                          Using this pattern
                        </Heading>
                        <PatternsExample
                          example={variant.example}
                          showCode={showCode}
                          onCodeToggle={() =>
                            toggleCode((showCode) => !showCode)
                          }
                          patternName={`${props.title} > ${variant.title}`}
                          relatedComponents={[
                            {
                              label: 'Date picker',
                              url: '/components/date-picker',
                            },
                            {label: 'Text', url: '/components/text-field'},
                          ]}
                        />
                      </Stack>
                      <Stack
                        as="section"
                        gap="4"
                        className={styles.UsefulToKnow}
                      >
                        <Heading
                          as="h3"
                          className={styles.UsefulHeading}
                          id="useful-to-know"
                        >
                          Useful to know
                        </Heading>
                        <UsefulToKnow>{variant.usefulToKnow}</UsefulToKnow>
                      </Stack>
                    </Stack>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
          <PatternsRelatedResources>
            {pattern.relatedResources}
          </PatternsRelatedResources>
        </Stack>
      </Page>
    </>
  );
}
