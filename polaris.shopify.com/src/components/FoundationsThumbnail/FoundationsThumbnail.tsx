import * as polarisIcons from '@shopify/polaris-icons';

import Icon from '../Icon';
import styles from './FoundationsThumbnail.module.scss';
import type {FoundationsCategory} from '../../types';

interface Props {
  icon: string;
  category?: FoundationsCategory;
}

function FoundationsThumbnail({icon, category}: Props) {
  let iconSource = (polarisIcons as any)[icon];

  return (
    <div
      className={styles.FoundationsThumbnail}
      {...(category && {'data-category': category})}
    >
      {iconSource && <Icon source={iconSource} />}
    </div>
  );
}

export default FoundationsThumbnail;
