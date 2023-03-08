import {Stack, Icon, Inline, Text} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import styles from './TipBanner.module.scss';

interface Props {
  title: string;
  message: string;
}

function TipBanner({title, message}: Props) {
  return (
    <div className={styles.TipBanner}>
      <Stack gap="2">
        <Inline gap="2">
          <div>
            <Icon source={InfoMinor} color="highlight" />
          </div>
          <Text as="h4" variant="headingMd">
            {title}
          </Text>
        </Inline>
        <p>{message}</p>
      </Stack>
    </div>
  );
}

export default TipBanner;
