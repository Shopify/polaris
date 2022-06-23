// TEMP FILE
// For user testing purposes only

import React from 'react';
import {
  EditMinor,
  FollowUpEmailMajor,
  HorizontalDotsMinor,
} from '@shopify/polaris-icons';

import {Body} from '../Body';
import {Card} from '../Card';
import {Display} from '../Display';
import {Icon} from '../Icon';
import {Link} from '../Link';
import {Stack} from '../Stack';
import {Text} from '../Text';
import {TextHeading as Heading} from '../TextHeading';

/* eslint-disable @shopify/jsx-no-hardcoded-content */

export const ProductTile = (props) => {
  return (
    <Stack vertical spacing="extraTight">
      <Text variant="bodyMd">{props.name}</Text>
      <Text variant="bodySm" color="subdued">
        {props.variants} variants
      </Text>
    </Stack>
  );
};

export const TextSingleComponentExercise = () => {
  return (
    <Card>
      <Card.Section>
        <Stack distribution="fill">
          <Stack vertical>
            <Text variant="displaySm" fontWeight="semibold">
              $12,450.98
            </Text>
            <Text variant="bodyMd" color="subdued">
              Sales this year
            </Text>
          </Stack>
          <Stack vertical>
            <Text variant="displaySm" fontWeight="semibold">
              Quarterly
            </Text>
            <Text variant="bodyMd" color="subdued">
              Order frequency
            </Text>
          </Stack>
        </Stack>
      </Card.Section>
      <Card.Section>
        <Stack distribution="fillEvenly">
          <Stack vertical>
            <Text variant="headingMd" fontWeight="semibold">
              Most purchased products
            </Text>
            <ProductTile name="Ocean breeze candle" variants="3" />
            <ProductTile name="Corn maze candle" variants="3" />
          </Stack>
          <Stack vertical>
            <Stack distribution="equalSpacing">
              <Text variant="headingMd" fontWeight="semibold">
                Suggested products
              </Text>
              <Icon source={FollowUpEmailMajor} color="subdued" />
            </Stack>
            <ProductTile name="Matcha candle" variants="3" />
            <ProductTile name="Maple glaze candle" variants="3" />
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export const TextMultiComponentExercise = () => {
  return (
    <Card>
      <Card.Section>
        <Stack distribution="trailing">
          <Icon source={EditMinor} color="subdued" />
        </Stack>
        <Display size="sm" align="center">
          Gordie gifts
        </Display>
        <Body size="md" align="center" color="subdued">
          Customer for 1 year
        </Body>
      </Card.Section>
      <Card.Section>
        <Stack distribution="equalSpacing">
          <Heading size="md">Main contact</Heading>
          <Icon source={HorizontalDotsMinor} color="subdued" />
        </Stack>
        <Body size="md" color="subdued">
          Ann Davis
        </Body>
        <Body size="md" color="subdued">
          ann.davis@gordiegifts.com
        </Body>
        <Link removeUnderline>
          <Body size="md">View all customers</Body>
        </Link>
      </Card.Section>
    </Card>
  );
};
/* eslint-enable @shopify/jsx-no-hardcoded-content */
