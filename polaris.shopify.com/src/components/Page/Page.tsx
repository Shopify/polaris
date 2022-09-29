import {useTOC} from '../../utils/hooks';
import {className} from '../../utils/various';
import Longform from '../Longform';
import Container from '../Container';

import styles from './Page.module.scss';
import TOC from '../TOC';
import Breadcrumbs from '../Breadcrumbs';
import {useRouter} from 'next/router';
import Link from 'next/link';

interface Props {
  title?: string;
  showTOC?: boolean;
  editPageLinkPath?: string;
  children: React.ReactNode;
}

function Layout({title, showTOC = true, editPageLinkPath, children}: Props) {
  const [tocItems] = useTOC(children);
  const {asPath} = useRouter();

  const githubIssueSubject = `[polaris.shopify.com] Feedback (on ${asPath})`;
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    githubIssueSubject,
  )}&amp;labels=polaris.shopify.com`;
  const editOnGithubUrl = editPageLinkPath
    ? `https://github.com/Shopify/polaris/tree/main${editPageLinkPath}`
    : '';

  return (
    <Container className={className(styles.Page, showTOC && styles.showTOC)}>
      <article className={styles.Post} id="main">
        <Breadcrumbs />
        {title && (
          <Longform>
            <h1>{title}</h1>
          </Longform>
        )}
        {children}
        <footer className={styles.Footer}>
          <p>
            {editOnGithubUrl && (
              <Link href={editOnGithubUrl}>Edit this page</Link>
            )}
            <Link href={feedbackUrl}>Leave feedback</Link>
          </p>
        </footer>
      </article>
      {showTOC && (
        <div className={styles.TOCWrapper}>
          <TOC items={tocItems} />
        </div>
      )}
    </Container>
  );
}

export default Layout;
