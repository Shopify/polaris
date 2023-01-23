import {AlphaStack, Icon, Inline} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import styles from './TipBanner.module.scss';

interface Props {
  title: string;
  message: string;
}

function TipBanner({title, message}: Props) {
  return (
    <div className={styles.TipBanner}>
      <AlphaStack gap="2">
        <Inline gap="2">
          <div>
            <Icon source={InfoMinor} color="highlight" />
          </div>
          <p className={styles.Title}>{title}</p>
        </Inline>
        <p>{message}</p>
      </AlphaStack>
    </div>
  );
}

export default TipBanner;
