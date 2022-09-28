import {useTOC} from '../../utils/hooks';
import {className} from '../../utils/various';
import Longform from '../Longform';
import Container from '../Container';

import styles from './Layout.module.scss';
import TOC from '../TOC';
import Breadcrumbs from '../Breadcrumbs';

interface Props {
  title?: string;
  showTOC?: boolean;
  children: React.ReactNode;
}

function Layout({title, showTOC = true, children}: Props) {
  const [tocItems] = useTOC(children);

  return (
    <>
      <Container
        className={className(styles.Layout, showTOC && styles.showTOC)}
      >
        <article className={styles.Post} id="main">
          <Breadcrumbs />
          {title && (
            <Longform>
              <h1>{title}</h1>
            </Longform>
          )}
          {children}
        </article>
        {showTOC && (
          <div className={styles.TOCWrapper}>
            <TOC items={tocItems} />
          </div>
        )}
      </Container>
    </>
  );
}

export default Layout;
