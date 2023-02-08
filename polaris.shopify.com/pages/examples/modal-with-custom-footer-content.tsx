import {
  Button,
  Modal,
  AlphaStack,
  Inline,
  Text,
  Box,
  Link,
  AlphaCard,
  Image,
  Thumbnail,
  ResourceList,
  ResourceItem,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

export function WithCustomFooterContent() {
  const [active, setActive] = useState(true);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const viewRecommendedAppsButton = (
    <Box
      as="button"
      width="100%"
      padding="4"
      border="base"
      borderRadius="2"
      onClick={toggleModal}
    >
      <Inline gap="2" align="start" blockAlign="center">
        <Image
          alt="Multi-color icon depicting apps that can be installed"
          size="extraSmall"
          source="https://cdn.shopify.com/shopifycloud/web/assets/v1/7d8afec8c40d8022c7c62b8a99f358797d5e6f8546ec0496e26c97f406d0df4e.svg"
        />
        <Text variant="bodyMd">Recommended local delivery apps</Text>
      </Inline>
    </Box>
  );

  const recommendedApps = [
    {
      iconSource:
        'https://cdn.shopify.com/app-store/listing_images/344d58fb5ba3e45b5c10756e4ba34b74/icon/CPXwi6b04PQCEAE=.png',
      name: 'Local Delivery + Store Pickup',
      description:
        'Local delivery | Order tracking | Fulfillments | Notifications',
      rating: 5.0,
      reviewCount: 15,
      promotion: 'Free plan available',
    },
    {
      iconSource:
        'https://cdn.shopify.com/app-store/listing_images/81daf05370b75b77bcc06ad853c9d6fd/icon/COvPvK30lu8CEAE=.png',
      name: 'Local Delivery Dispatch',
      description:
        'Fast local delivery dispatch and tracking with route planning',
      rating: 4.9,
      reviewCount: 7,
      promotion: 'Free to install',
    },
    {
      iconSource:
        'https://cdn.shopify.com/app-store/listing_images/a025a29145b1f0be4ef5692148f05569/icon/CLvai6LUx_cCEAE=.png',
      name: 'Amai Local Pickup & Delivery',
      description:
        'Fast local delivery dispatch and tracking with route planning',
      rating: 4.5,
      reviewCount: 326,
      promotion: '14-day free trial',
    },
  ];

  const appList = (
    <ResourceList
      selectable={false}
      resourceName={{singular: 'app', plural: 'apps'}}
      items={recommendedApps}
      renderItem={({
        iconSource,
        name,
        description,
        rating,
        reviewCount,
        promotion,
      }) => (
        <ResourceItem
          id={`App--${name}`}
          key={name}
          name={name}
          url=""
          verticalAlignment="center"
          media={<Thumbnail size="medium" source={iconSource || AppsMajor} />}
          accessibilityLabel={`View the ${name} app in the app store`}
        >
          <AlphaStack>
            <Text variant="headingMd">{name}</Text>
            <Inline gap="1">
              <Text fontWeight="medium">{rating}</Text>
              <Text fontWeight="medium">
                <span as="span" role="img" aria-label="star">
                  ⭐️
                </span>
              </Text>
              <Text fontWeight="medium">{`(${reviewCount})`}</Text>
              <Text fontWeight="medium">•</Text>
              <Text fontWeight="medium">{promotion}</Text>
            </Inline>
            <Text color="subdued">{description}</Text>
          </AlphaStack>
        </ResourceItem>
      )}
    />
  );

  const localDeliverySettingCard = (
    <AlphaCard padding="5">
      <AlphaStack gap="5">
        <Text variant="headingMd">Manage local deliveries</Text>
        <Text>
          Get an optimized route or plan the order of delivery stops yourself.
          With local delivery apps, you and your staff can view routes, contact
          customers, update delivery statuses, and more.
        </Text>

        <Modal
          open={active}
          activator={viewRecommendedAppsButton}
          title="Recommended local delivery apps"
          onClose={toggleModal}
          footer={
            <Box width="100%">
              <Inline align="center" blockAlign="center">
                <Text variant="headingMd" fontWeight="semibold">
                  Find more local delivery apps in the{' '}
                  <Link>Shopify App Store</Link>
                </Text>
              </Inline>
            </Box>
          }
        >
          {appList}
        </Modal>
      </AlphaStack>
    </AlphaCard>
  );

  return <div style={{height: '500px'}}>{localDeliverySettingCard}</div>;
}

export default withPolarisExample(WithCustomFooterContent);
