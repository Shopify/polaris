import {NavItems} from '@/types';
import {Inter} from 'next/font/google';
import {className} from '@/utils';
import Navigation from './components/Navigation';
import styles from './Frame.module.scss';
const inter = Inter({subsets: ['latin']});

interface Props {
  navItems: NavItems;
  children: React.ReactNode;
}

function Frame({navItems, children}: Props) {
  return (
    <div className={className(styles.Frame, inter.className)}>
      <a href="#main" className={styles.SkipToMain}>
        Skip to main content
      </a>
      <Navigation navItems={navItems} />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}

export default Frame;
