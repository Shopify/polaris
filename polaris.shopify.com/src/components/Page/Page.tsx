import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTOC} from '../../utils/hooks';
import {className} from '../../utils/various';
import {Box} from '../Box';
import Breadcrumbs from '../Breadcrumbs';
import Container from '../Container';
import {PageWithUrl} from '../Editor/types';
import EditorRenderer from '../EditorRenderer';
import Longform from '../Longform';
import PageMeta from '../PageMeta';
import TOC from '../TOC';
import styles from './Page.module.scss';

interface Props {
  page: PageWithUrl;
  showTOC?: boolean;
  children?: React.ReactNode;
}

function Page({page, showTOC = true, children}: Props) {
  const [tocItems] = useTOC(page.id);
  const {asPath} = useRouter();

  const githubIssueSubject = `[polaris.shopify.com] Feedback (on ${asPath})`;
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    githubIssueSubject,
  )}&amp;labels=polaris.shopify.com`;
  const editOnGithubUrl = `https://github.com/Shopify/polaris/tree/main/src/content.ts`;

  return (
    <Container className={className(styles.Page, showTOC && styles.showTOC)}>
      <PageMeta
        title={page.title}
        description={page.excerpt}
        noIndex={page.noIndex}
      />

      <Box as="article" className={styles.Post} id="main">
        <Breadcrumbs currentPage={page} />

        <Longform>
          <h1>{page.title}</h1>
        </Longform>

        {children ? <>{children}</> : <EditorRenderer page={page} />}

        <footer className={styles.Footer}>
          <p>
            {editOnGithubUrl && (
              <Link href={editOnGithubUrl}>Edit this page</Link>
            )}
            <Link href={feedbackUrl}>Leave feedback</Link>
          </p>
        </footer>
      </Box>

      {showTOC && (
        <div className={styles.TOCWrapper}>
          <TOC items={tocItems} />
        </div>
      )}
    </Container>
  );
}

export default Page;
