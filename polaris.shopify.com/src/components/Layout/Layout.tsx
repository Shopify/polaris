import {useTOC} from '../../utils/hooks';
import {className} from '../../utils/various';
import Longform from '../Longform';
import Container from '../Container';
import Nav, {NavItem} from '../Nav';

import styles from './Layout.module.scss';
import TOC from '../TOC';

interface Props {
  width?: 'full' | 'narrow';
  navItems?: NavItem[];
  title?: string;
  showTOC?: boolean;
  children: React.ReactNode;
}

function Layout({
  width = 'full',
  navItems,
  title,
  showTOC = true,
  children,
}: Props) {
  const [tocItems] = useTOC(children);

  return (
    <Container
      className={className(
        styles.Layout,
        showTOC && styles.showTOC,
        width === 'narrow' && styles.narrow,
      )}
    >
      <div className={styles.Nav}>
        {navItems && <Nav navItems={navItems} />}
      </div>

      <article className={styles.Post} id="main">
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
  );
}

export default Layout;
