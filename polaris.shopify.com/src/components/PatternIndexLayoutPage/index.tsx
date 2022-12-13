import Link from 'next/link';

import StatusBadge from '../StatusBadge';
import {StatusName} from '../../types';
import Page from '../Page';
import PageMeta from '../PageMeta';
import {TableContainer, Table, TableCaption, Tr, Td} from '../Table';
import {Heading} from '../Heading';
import {Stack, Row} from '../Stack';
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
        <Heading as="h1">
          <Row wrap gap="2" className={styles.Heading}>
            {title}{' '}
            <StatusBadge status={{value: StatusName.Beta, message: ''}} />
          </Row>
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
        <TableContainer>
          <Table>
            <TableCaption className={styles.WhenToUseCaption}>
              When merchants need to:
            </TableCaption>
            <Tr>
              <Td className={styles.UseCase}>Find and change app settings</Td>
              <Td>This is a description of the use case.</Td>
            </Tr>
            <Tr>
              <Td className={styles.UseCase}>Another merchant objective</Td>
              <Td>This is a description of the use case.</Td>
            </Tr>
          </Table>
        </TableContainer>
      </Stack>
    </Page>
  </>
);
