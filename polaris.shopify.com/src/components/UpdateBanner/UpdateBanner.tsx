import styles from './UpdateBanner.module.scss';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';

interface Props {
  update?: string;
}

function UpdateBanner({update}: Props) {
  return (
    <div className={styles.Banner}>
      <Icon source={FlagMajor} width={20} height={20} />
      <p>{update}</p>
    </div>
  );
}

export default UpdateBanner;
