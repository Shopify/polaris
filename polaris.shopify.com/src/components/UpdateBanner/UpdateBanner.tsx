import styles from './UpdateBanner.module.scss';
import {FlagMajor} from '@shopify/polaris-icons';
import Icon from '../Icon';

interface Props {
  updateBanner?: string;
}

function UpdateBanner({updateBanner}: Props) {
  return (
    <div className={styles.Banner}>
      <Icon source={FlagMajor} width={20} height={20} />
      <p>{updateBanner}</p>
    </div>
  );
}

export default UpdateBanner;
