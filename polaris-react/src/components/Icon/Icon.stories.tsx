import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Icon,
  Text,
  BlockStack,
  InlineStack,
  RangeSlider,
} from '@shopify/polaris';
import * as polarisIcons from '@shopify/polaris-icons';
import iconMetadata from '@shopify/polaris-icons/metadata';

export default {
  component: Icon,
} as ComponentMeta<typeof Icon>;

interface Icons {
  [key: string]: any;
}
const icons: Icons = polarisIcons;

export function Default() {
  return <Icon source={icons.PlusCircleIcon} />;
}

export function Colored() {
  return (
    <BlockStack gap="200">
      <Text as="p" variant="bodyMd" alignment="center">
        Base tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="base" />
      <Text as="p" variant="bodyMd" alignment="center">
        Subdued tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="subdued" />
      <Text as="p" variant="bodyMd" alignment="center">
        Primary tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="primary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Info tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="info" />
      <Text as="p" variant="bodyMd" alignment="center">
        Success tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="success" />
      <Text as="p" variant="bodyMd" alignment="center">
        Caution tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="caution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Warning tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="warning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Critical tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="critical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Emphasis tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="emphasis" />
      <Text as="p" variant="bodyMd" alignment="center">
        Magic tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="magic" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Primary tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textPrimary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Caution tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textCaution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Warning tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textWarning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Critical tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textCritical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Info tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textInfo" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Success tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textSuccess" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Magic tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="textMagic" />
    </BlockStack>
  );
}

export function WithToneInherit() {
  return (
    <BlockStack gap="200">
      <Text as="p" tone="caution" variant="bodyMd" alignment="center">
        Caution tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="critical" variant="bodyMd" alignment="center">
        Critical tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="magic" variant="bodyMd" alignment="center">
        Magic tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="magic-subdued" variant="bodyMd" alignment="center">
        Magic subdued tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="subdued" variant="bodyMd" alignment="center">
        Subdued tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="success" variant="bodyMd" alignment="center">
        Success tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="text-inverse" variant="bodyMd" alignment="center">
        Text inverse tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
    </BlockStack>
  );
}

export function WithPlaceholder() {
  return <Icon source="placeholder" />;
}

export function WithExternalIcon() {
  return (
    <Icon source="%3Csvg%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.5%203.75a.75.75%200%200%201%20.75-.75h1.612a1.75%201.75%200%200%201%201.732%201.5h9.656a.75.75%200%200%201%20.748.808l-.358%204.653a2.75%202.75%200%200%201-2.742%202.539h-6.351l.093.78a.25.25%200%200%200%20.248.22h6.362a.75.75%200%200%201%200%201.5h-6.362a1.75%201.75%200%200%201-1.738-1.543l-1.04-8.737a.25.25%200%200%200-.248-.22h-1.612a.75.75%200%200%201-.75-.75Zm6.708%202.458a.625.625%200%200%200%200%20.884l1.408%201.408-1.408%201.408a.625.625%200%201%200%20.884.884l1.408-1.408%201.408%201.408a.625.625%200%201%200%20.884-.884l-1.408-1.408%201.408-1.408a.625.625%200%200%200-.884-.884l-1.408%201.408-1.408-1.408a.625.625%200%200%200-.884%200Z%22%20fill%3D%22%235C5F62%22%2F%3E%3Cpath%20d%3D%22M10%2017a1%201%200%201%201-2%200%201%201%200%200%201%202%200Z%22%20fill%3D%22%235C5F62%22%2F%3E%3Cpath%20d%3D%22M14%2018a1%201%200%201%200%200-2%201%201%200%200%200%200%202Z%22%20fill%3D%22%235C5F62%22%2F%3E%3C%2Fsvg%3E" />
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

  return <Icon source={iconContent} tone="warning" />;
}

export function PolarisIconsLibrary() {
  return (
    <BlockStack gap="100" inlineAlign="start">
      {Object.keys(iconMetadata).map((icon) => (
        <InlineStack key={icon} gap="200">
          <Icon source={polarisIcons[icon]} />
          <Text as="span">{icon}</Text>
        </InlineStack>
      ))}
    </BlockStack>
  );
}

const stokeWidthIconNames = [
  'CameraIcon',
  'DragDropIcon',
  'GlobeIcon',
  'OrderIcon',
  'PackageReturnedIcon',
];

const strokeWidthIcons = Object.keys(iconMetadata).filter((icon) =>
  stokeWidthIconNames.includes(icon),
);

export function StrokeWidth() {
  const [strokeWidthValue, setStrokeWidthValue] = useState(1.5);
  const [iconSizeValue, setIconSizeValue] = useState(20);

  const handleStrokeWidthChange = useCallback(
    (value) => setStrokeWidthValue(value),
    [],
  );

  const handleIconSizeChange = useCallback(
    (value) => setIconSizeValue(value),
    [],
  );

  return (
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '--pc-icon-size': `${iconSizeValue}px`,
        '--pc-icon-stroke-width': `${strokeWidthValue}px`,
      }}
    >
      <BlockStack gap="100" inlineAlign="start">
        {strokeWidthIcons.map((icon) => (
          <InlineStack key={icon} gap="200">
            {originalIcons[icon]}
            <Icon source={polarisIcons[icon]} />
            <Text as="span" variant="bodyMd">
              {icon}
            </Text>
          </InlineStack>
        ))}
        <RangeSlider
          label={`Stroke width: ${strokeWidthValue}px`}
          value={strokeWidthValue}
          onChange={handleStrokeWidthChange}
          step={0.01}
          min={0}
          max={3}
          output
        />
        <RangeSlider
          label={`Icon size: ${iconSizeValue}px`}
          value={iconSizeValue}
          onChange={handleIconSizeChange}
          step={0.1}
          min={10}
          max={20}
          output
        />
      </BlockStack>
    </div>
  );
}

const originalIcons = {
  CameraIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      height="20"
      width="20"
    >
      <path
        fill-rule="evenodd"
        d="M10 7.25a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Zm-1.75 3.25a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Z"
      />
      <path
        fill-rule="evenodd"
        d="M8.584 4a2.75 2.75 0 0 0-2.435 1.472l-.346.658a.691.691 0 0 1-.612.37c-1.21 0-2.191.981-2.191 2.191v4.559a2.75 2.75 0 0 0 2.75 2.75h8.5a2.75 2.75 0 0 0 2.75-2.75v-4.559c0-1.21-.981-2.191-2.191-2.191a.691.691 0 0 1-.612-.37l-.346-.658a2.75 2.75 0 0 0-2.435-1.472h-2.832Zm-1.107 2.169a1.25 1.25 0 0 1 1.107-.669h2.832c.465 0 .89.258 1.107.669l.345.658a2.191 2.191 0 0 0 1.94 1.173c.383 0 .692.31.692.691v4.559c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-4.559c0-.381.31-.691.691-.691a2.19 2.19 0 0 0 1.94-1.173l.346-.658Z"
      />
    </svg>
  ),
  DragDropIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      height="20"
      width="20"
    >
      <path d="M6.25 3.5a2.75 2.75 0 0 0-2.75 2.75.75.75 0 0 0 1.5 0c0-.69.56-1.25 1.25-1.25a.75.75 0 0 0 0-1.5Z" />
      <path d="M3.5 13.75a2.75 2.75 0 0 0 2.75 2.75.75.75 0 0 0 0-1.5c-.69 0-1.25-.56-1.25-1.25a.75.75 0 0 0-1.5 0Z" />
      <path d="M13.75 3.5a2.75 2.75 0 0 1 2.75 2.75.75.75 0 0 1-1.5 0c0-.69-.56-1.25-1.25-1.25a.75.75 0 0 1 0-1.5Z" />
      <path d="M5 9a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0v-2Z" />
      <path d="M11.75 4.25a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .75.75Z" />
      <path d="M7.75 6a1.75 1.75 0 0 0-1.75 1.75v4.5c0 .966.784 1.75 1.75 1.75h1.25a.75.75 0 0 0 0-1.5h-1.25a.25.25 0 0 1-.25-.25v-4.5a.25.25 0 0 1 .25-.25h4.5a.25.25 0 0 1 .25.25v1.25a.75.75 0 0 0 1.5 0v-1.25a1.75 1.75 0 0 0-1.75-1.75h-4.5Z" />
      <path d="M11.065 10.46a.5.5 0 0 0-.606.605l1.122 4.51a.5.5 0 0 0 .838.234l1.165-1.165.84.841a.5.5 0 0 0 .708 0l.353-.353a.5.5 0 0 0 0-.707l-.84-.841 1.164-1.165a.5.5 0 0 0-.233-.838l-4.51-1.122Z" />
    </svg>
  ),
  GlobeIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      height="20"
      width="20"
    >
      <path
        fill-rule="evenodd"
        d="M3 10a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-5.5a5.497 5.497 0 0 0-4.737 2.703l2 1.999c.472.472.737 1.113.737 1.78v.518a.5.5 0 0 0 .5.5 2 2 0 0 1 2 2v1.478a5.504 5.504 0 0 0 4.52-3.228h-1.02a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 0-.75-.75h-2.5a1.755 1.755 0 0 1-1.07-3.144l.463-.356a.393.393 0 0 0 .152-.312v-.04c0-.885.62-1.624 1.449-1.808a5.531 5.531 0 0 0-.994-.09Zm2.875.81a1.85 1.85 0 0 1-1.477.735.352.352 0 0 0-.353.353v.04c0 .587-.271 1.14-.736 1.499l-.462.356a.256.256 0 0 0 .153.457h2.5a2.25 2.25 0 0 1 2.236 2h.713a5.497 5.497 0 0 0-2.574-5.44Zm-8.375 4.69c0-.443.052-.875.152-1.288l1.55 1.55c.19.191.298.45.298.72v.518a2 2 0 0 0 2 2 .5.5 0 0 1 .5.5v1.41a5.502 5.502 0 0 1-4.5-5.41Z"
      />
    </svg>
  ),
  OrderIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      height="20"
      width="20"
    >
      <path
        fill-rule="evenodd"
        d="M6.976 3.5a2.75 2.75 0 0 0-2.72 2.347l-.662 4.46a8.75 8.75 0 0 0-.094 1.282v1.661a3.25 3.25 0 0 0 3.25 3.25h6.5a3.25 3.25 0 0 0 3.25-3.25v-1.66c0-.43-.032-.858-.095-1.283l-.66-4.46a2.75 2.75 0 0 0-2.72-2.347h-6.05Zm-1.237 2.567a1.25 1.25 0 0 1 1.237-1.067h6.048c.62 0 1.146.454 1.237 1.067l.583 3.933h-2.484a1.25 1.25 0 0 0-1.185.855l-.159.474a.25.25 0 0 1-.237.171h-1.558a.25.25 0 0 1-.237-.17l-.159-.475a1.25 1.25 0 0 0-1.185-.855h-2.484l.583-3.933Zm-.738 5.433-.001.09v1.66c0 .966.784 1.75 1.75 1.75h6.5a1.75 1.75 0 0 0 1.75-1.75v-1.75h-2.46l-.1.303a1.75 1.75 0 0 1-1.66 1.197h-1.56a1.75 1.75 0 0 1-1.66-1.197l-.1-.303h-2.46Z"
      />
    </svg>
  ),
  PackageReturnedIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      height="20"
      width="20"
    >
      <path
        fill-rule="evenodd"
        d="M7 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4Zm.5 3.5v-2h3v2h-3Z"
      />
      <path
        fill-rule="evenodd"
        d="M5.315 4.45a2.25 2.25 0 0 1 1.836-.95h5.796a2.25 2.25 0 0 1 1.872 1.002l1.22 1.828c.3.452.461.983.461 1.526v6.894a1.75 1.75 0 0 1-1.75 1.75h-9.5a1.75 1.75 0 0 1-1.75-1.75v-6.863c0-.57.177-1.125.506-1.59l1.309-1.848Zm1.836.55a.75.75 0 0 0-.612.316l-.839 1.184h3.55v-1.5h-2.1Zm3.599 1.5h3.599l-.778-1.166a.75.75 0 0 0-.624-.334h-2.197v1.5Zm4.25 1.5h-10v6.75c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25v-6.75Z"
      />
    </svg>
  ),
};
