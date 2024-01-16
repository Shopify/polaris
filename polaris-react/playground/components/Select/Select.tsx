import React from 'react';
import {SelectMinor} from '@shopify/polaris-icons';

import type {OptionListProps} from '../../../src';
import {
  BlockStack,
  Icon,
  Text,
  InlineGrid,
  UnstyledButton,
  Popover,
} from '../../../src';
import {Options} from '../Options/Options';

import styles from './Select.module.scss';

interface Props {
  title: string;
  defaultSelected?: string[];
}

export function Select({
  title,
  defaultSelected,
  options,
}: Props & Pick<OptionListProps, 'options'>) {
  const [active, setActive] = React.useState(false);
  // const [selected, setSelected] = React.useState(defaultSelected ?? []);

  const firstSelected = options?.find(
    (option) => option.value === defaultSelected?.[0],
  )?.label;

  const activator = (
    <UnstyledButton
      onClick={() => setActive((active) => !active)}
      className={styles.Select}
    >
      <InlineGrid columns="1fr auto" alignItems="center">
        <BlockStack gap="100" inlineAlign="start">
          <Text as="h3" variant="bodySm" tone="subdued">
            {title}
          </Text>
          {defaultSelected?.length && (
            <Text as="span" variant="bodyMd">
              {firstSelected}
            </Text>
          )}
        </BlockStack>
        <Icon source={SelectMinor} tone="subdued" />
      </InlineGrid>
    </UnstyledButton>
  );

  return (
    <Popover
      fullWidth
      active={active}
      onClose={() => setActive(false)}
      // TODO: Allow coverage of activator
      // preferredAlignment="cover"
      activator={activator}
    >
      <Options />
    </Popover>
  );
}
