import {VerticalStack, Icon, HorizontalStack, Text} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import styles from './TipBanner.module.scss';

interface Props {
  title: string;
  message: string;
}

function TipBanner({title, message}: Props) {
  return (
    <div className={styles.TipBanner}>
      <VerticalStack gap="2">
        <HorizontalStack gap="2">
          <div>
            <Icon source={InfoMinor} color="highlight" />
          </div>
          <Text as="h4" variant="headingMd">
            {title}
          </Text>
        </HorizontalStack>
        <p>{message}</p>
      </VerticalStack>
    </div>
  );
}

export default TipBanner;
