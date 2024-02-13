import {BlockStack, Icon, InlineStack, Text} from '@shopify/polaris';
import {InfoIcon} from '@shopify/polaris-icons';
import styles from './TipBanner.module.scss';

interface Props {
  title?: string;
  children: React.ReactNode;
}

function TipBanner({title = 'Tip', children}: Props) {
  return (
    <div className={styles.TipBanner}>
      <BlockStack gap="200">
        <InlineStack gap="200">
          <div>
            <Icon source={InfoIcon} tone="info" />
          </div>
          <Text as="h4" variant="headingMd">
            {title}
          </Text>
        </InlineStack>
        {children}
      </BlockStack>
    </div>
  );
}

export default TipBanner;
