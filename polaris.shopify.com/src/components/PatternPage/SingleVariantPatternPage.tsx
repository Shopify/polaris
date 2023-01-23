import React, {useState} from 'react';

import Link from 'next/link';

import {HowItHelps, UsefulToKnow} from './Blocks';
import StatusBadge from '../StatusBadge';
import {
  StatusName,
  SingleVariantPattern,
  PatternFrontMatter,
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
  pattern: SingleVariantPattern;
}

export default function SingleVariantPatternPage({pattern, ...props}: Props) {
  const [showCode, toggleCode] = useState(false);

  return (
    <>
      <PageMeta title={props.title} description={pattern.description} />

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
          <Stack gap="4">
            <Stack gap="8">
              {pattern.description ? (
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
                  {pattern.description}
                </Markdown>
              ) : null}
              <Stack as="section" gap="4" className={styles.MerchantGoal}>
                <Heading as="h2" id="how-it-helps-merchants">
                  How it helps merchants
                </Heading>
                <HowItHelps>{pattern.howItHelps}</HowItHelps>
              </Stack>
              <Stack as="section" gap="4">
                <Heading as="h2" id="using-this-pattern">
                  Using this pattern
                </Heading>
                <PatternsExample
                  example={pattern.example}
                  showCode={showCode}
                  onCodeToggle={() => toggleCode((showCode) => !showCode)}
                  patternName={`${props.title} > ${pattern.title}`}
                  relatedComponents={[
                    {
                      label: 'Date picker',
                      url: '/components/date-picker',
                    },
                    {label: 'Text', url: '/components/text-field'},
                  ]}
                />
              </Stack>
              <Stack as="section" gap="4" className={styles.UsefulToKnow}>
                <Heading
                  as="h3"
                  className={styles.UsefulHeading}
                  id="useful-to-know"
                >
                  Useful to know
                </Heading>
                <UsefulToKnow>{pattern.usefulToKnow}</UsefulToKnow>
              </Stack>
            </Stack>
          </Stack>
          <PatternsRelatedResources>
            {pattern.relatedResources}
          </PatternsRelatedResources>
        </Stack>
      </Page>
    </>
  );
}
