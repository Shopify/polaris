import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {VerticalStack, Box, Icon} from '@shopify/polaris';
import type {BoxProps, IconProps} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';

export default {
  component: Icon,
} as ComponentMeta<typeof Icon>;

export function Default() {
  return <Icon source={CirclePlusMinor} />;
}

export function Colored() {
  return (
    <div>
      <Icon source={CirclePlusMinor} color="base" />
      <Icon source={CirclePlusMinor} color="subdued" />
      <Icon source={CirclePlusMinor} color="primary" />
      <Icon source={CirclePlusMinor} color="highlight" />
      <Icon source={CirclePlusMinor} color="success" />
      <Icon source={CirclePlusMinor} color="warning" />
      <Icon source={CirclePlusMinor} color="critical" />
      <Icon source={CirclePlusMinor} color="magic" />
    </div>
  );
}

export function WithBackdrop() {
  const BackdropIcon = ({
    boxBackground,
    iconColor,
  }: {
    boxBackground: BoxProps['background'];
    iconColor: IconProps['color'];
  }) => (
    <Box
      background={boxBackground}
      padding="1"
      width="28px"
      borderRadius="full"
    >
      <Icon source={CirclePlusMinor} color={iconColor} />
    </Box>
  );
  return (
    <VerticalStack gap="1">
      <BackdropIcon iconColor="base" boxBackground="bg-strong" />
      <BackdropIcon iconColor="highlight" boxBackground="bg-info" />
      <BackdropIcon iconColor="success" boxBackground="bg-success" />
      <BackdropIcon iconColor="warning" boxBackground="bg-warning" />
      <BackdropIcon iconColor="critical" boxBackground="bg-critical" />
    </VerticalStack>
  );
}

export function WithCustomSVG() {
  return (
    <Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
  );
}

export function WithCustomSVGAndColor() {
  const iconContent = () => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return <Icon source={iconContent} color="warning" />;
}
