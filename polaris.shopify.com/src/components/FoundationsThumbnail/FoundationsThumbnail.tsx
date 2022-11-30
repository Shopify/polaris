import * as polarisIcons from '@shopify/polaris-icons';

import Icon from '../Icon';
import styles from './FoundationsThumbnail.module.scss';

interface Props {
  icon: string;
  category: string;
}

function FoundationsThumbnail({icon, category}: Props) {
  let iconSource = (polarisIcons as any)[icon];

  return (
    <div className={styles.FoundationsThumbnail} data-category={category}>
      {iconSource && <Icon source={iconSource} />}
    </div>
  );
}

export default FoundationsThumbnail;
