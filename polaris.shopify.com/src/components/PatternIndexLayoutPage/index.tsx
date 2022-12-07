import Link from 'next/link';

import StatusBadge from '../StatusBadge';
import {StatusName} from '../../types';
import Page from '../Page';
import PageMeta from '../PageMeta';
import {Table, TableHeader, TableRow} from '../Table';
import {Heading} from '../Heading';
import {Stack} from '../Stack';
import {Lede} from '../Lede';
import styles from './PatternIndexLayoutPage.module.scss';

const title = 'Date Picking';
const description =
  'Date picking lets merchants select a date or date range to help them analyze information to make decisions, or launch and publish.';
const newDiscussionLink = `https://github.com/Shopify/polaris/discussions/new?category=pattern-documentation&title=[${encodeURIComponent(
  title,
)}]`;
const knownIssuesLink = `https://github.com/Shopify/polaris/issues?q=is%3Aopen+is%3Aissue+label%3APattern+${encodeURIComponent(
  title,
)}`;

export const PatternIndexLayoutPage = () => (
  <>
    <PageMeta title={title} description={description} />

    <Page showTOC={false}>
      <Stack gap="4">
        <Heading as="h1" className={styles.Heading}>
          {title} <StatusBadge status={{value: StatusName.Beta, message: ''}} />
        </Heading>
        <Lede>{description}</Lede>
        <p className={styles.InfoLine}>
          Maintainer: Core Optimize •{' '}
          <Link className={styles.InfoLineLink} href={newDiscussionLink}>
            Discuss on GitHub
          </Link>{' '}
          •{' '}
          <Link className={styles.InfoLineLink} href={knownIssuesLink}>
            {' '}
            Known issues
          </Link>
        </p>
      </Stack>
      <Stack gap="4">
        <Heading as="h2">When to use</Heading>
        <Table>
          <TableHeader>When merchants need to:</TableHeader>
          <TableRow>Row1</TableRow>
          <TableRow>Row2</TableRow>
        </Table>
      </Stack>
    </Page>
  </>
);
