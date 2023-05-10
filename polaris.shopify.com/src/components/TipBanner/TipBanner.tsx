import {VerticalStack, Icon, HorizontalStack, Text} from '@shopify/polaris';
import {InfoMinor} from '@shopify/polaris-icons';
import styles from './TipBanner.module.scss';

interface Props {
  title: string;
  children: React.ReactNode;
}

function TipBanner({title, children}: Props) {
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
        {children}
      </VerticalStack>
    </div>
  );
}

export default TipBanner;
