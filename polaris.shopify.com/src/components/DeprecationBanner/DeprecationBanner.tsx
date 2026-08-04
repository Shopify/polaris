import {ArrowRightIcon} from '@shopify/polaris-icons';

import Icon from '../Icon';
import icons from '../../icons';
import styles from './DeprecationBanner.module.scss';

export const WEB_COMPONENTS_URL =
  'https://shopify.dev/docs/api/app-home/polaris-web-components';

/**
 * Site-wide notice that these docs are an archived snapshot.
 *
 * polaris.shopify.com has been decommissioned and this site is a static,
 * read-only copy published from the archived repo, so every page needs to say
 * what it is and where to go instead.
 */
function DeprecationBanner() {
  return (
    <aside className={styles.DeprecationBanner}>
      <div className={styles.Content}>
        <span className={styles.Icon} aria-hidden="true">
          {icons.Polaris()}
        </span>
        <p>
          <strong>Polaris React is in maintenance mode.</strong> These archived
          docs cover the <code>@shopify/polaris</code> React library. New
          Shopify admin development should use Polaris web components.
        </p>
        <a className={styles.Cta} href={WEB_COMPONENTS_URL}>
          Go to Polaris web components
          <Icon source={ArrowRightIcon} />
        </a>
      </div>
    </aside>
  );
}

export default DeprecationBanner;
