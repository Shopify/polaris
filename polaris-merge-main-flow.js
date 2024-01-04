/* eslint-disable no-console */
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

import execa from 'execa';
import readlineSync from 'readline-sync';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const tempMigrationDir = path.join(__dirname, './temp-migrations');
const migrations = {
  Avatar: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-react-avatar-component',
      name: 'Avatar size prop',
      falsePositiveRegExp: 'size',
      manualRegexps: [
        String.raw`<Avatar[^>\w](?:[^>]|\n)*?size(?!="(?:xs|sm|md|lg|xl))`,
        String.raw`<Avatar[^>\w](?:[^>]|\n)*?shape`,
      ],
    },
  ],
  Badge: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Badge --fromProp status --toProp tone',
      name: 'Badge status prop',
      falsePositiveRegExp: 'status',
      manualRegexps: [
        String.raw`<Badge[^\w>](?!(?:[^>]|\n)*?tone)(?:[^>]|\n)*?status`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Badge --fromProp statusAndProgressLabelOverride --toProp toneAndProgressLabelOverride',
      name: 'Badge statusAndProgressLabelOverride prop',
      falsePositiveRegExp: 'statusAndProgressLabelOverride',
      manualRegexps: [
        String.raw`<Badge[^\w>](?!(?:[^>]|\n)*?toneAndProgressLabelOverride)(?:[^>]|\n)*?statusAndProgressLabelOverride`,
      ],
    },
  ],
  'IndexTable.Row': [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName IndexTable.Row --fromProp status --toProp tone',
      name: 'IndexTable.Row status prop',
      falsePositiveRegExp: 'IndexTable.Row',
      manualRegexps: [
        String.raw`<IndexTable.Row[^\w>](?!(?:[^>]|\n)*?tone)(?:[^>]|\n)*?status`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName IndexTable.Row --fromPropType boolean --fromProp subdued --toProp tone --toValue subdued',
      name: 'IndexTable.Row subdued prop',
      falsePositiveRegExp: 'IndexTable.Row',
      manualRegexps: [
        String.raw`<IndexTable.Row[^\w>](?!(?:[^>]|\n)*?tone)(?:[^>]|\n)*?subdued`,
      ],
    },
  ],
  'Layout.Section': [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Layout.Section --fromPropType boolean --fromProp oneThird --toProp variant --toValue oneThird',
      name: 'Layout.Section oneThird prop',
      falsePositiveRegExp: 'oneThird',
      manualRegexps: [
        String.raw`<Layout.Section[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?oneThird`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Layout.Section --fromPropType boolean --fromProp oneHalf --toProp variant --toValue oneHalf',
      name: 'Layout.Section oneHalf prop',
      falsePositiveRegExp: 'oneHalf',
      manualRegexps: [
        String.raw`<Layout.Section[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?oneHalf`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Layout.Section --fromPropType boolean --fromProp fullWidth --toProp variant --toValue fullWidth',
      name: 'Layout.Section fullWidth prop',
      falsePositiveRegExp: 'fullWidth',
      manualRegexps: [
        String.raw`<Layout.Section[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?fullWidth`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Layout.Section --fromPropType boolean --fromProp secondary --toProp variant --toValue oneThird',
      name: 'Layout.Section secondary prop',
      falsePositiveRegExp: 'secondary',
      manualRegexps: [String.raw`<Layout\.Section[^>\w](?:[^>]|\n)*?secondary`],
    },
  ],
  TextField: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName TextField --fromPropType boolean --fromProp borderless --toProp variant --toValue borderless',
      name: 'TextField borderless prop',
      falsePositiveRegExp: 'borderless',
      manualRegexps: [
        String.raw`<TextField[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?borderless`,
      ],
    },
  ],
  Box: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Box --fromProp borderRadiusEndStart --toProp borderEndStartRadius',
      name: 'Box borderRadiusEndStart prop',
      falsePositiveRegExp: 'borderRadiusEndStart',
      manualRegexps: [String.raw`<Box[^>\w](?:[^>]|\n)*?borderRadiusEndStart`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Box --fromProp borderRadiusEndEnd --toProp borderEndEndRadius',
      name: 'Box borderRadiusEndEnd prop',
      falsePositiveRegExp: 'borderRadiusEndEnd',
      manualRegexps: [String.raw`<Box[^>\w](?:[^>]|\n)*?borderRadiusEndEnd`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Box --fromProp borderRadiusStartStart --toProp borderStartStartRadius',
      name: 'Box borderRadiusStartStart prop',
      falsePositiveRegExp: 'borderRadiusStartStart',
      manualRegexps: [
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderRadiusStartStart`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Box --fromProp borderRadiusStartEnd --toProp borderStartEndRadius',
      name: 'Box borderRadiusStartEnd prop',
      falsePositiveRegExp: 'borderRadiusStartEnd',
      manualRegexps: [String.raw`<Box[^>\w](?:[^>]|\n)*?borderRadiusStartEnd`],
    },
  ],
  HorizontalStack: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-rename-component --renameFrom HorizontalStack --renameTo InlineStack --renamePropsFrom HorizontalStackProps --renamePropsTo InlineStackProps',
      name: 'HorizontalStack',
      falsePositiveRegExp: 'HorizontalStack',
      manualRegexps: [String.raw`HorizontalStack`],
    },
  ],
  VerticalStack: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-rename-component --renameFrom VerticalStack --renameTo BlockStack --renamePropsFrom VerticalStackProps --renamePropsTo BlockStackProps',
      name: 'VerticalStack',
      falsePositiveRegExp: 'VerticalStack',
      manualRegexps: [String.raw`VerticalStack`],
    },
  ],
  HorizontalGrid: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-rename-component --renameFrom HorizontalGrid --renameTo InlineGrid --renamePropsFrom HorizontalGridProps --renamePropsTo InlineGridProps',
      name: 'HorizontalGrid',
      falsePositiveRegExp: 'HorizontalGrid',
      manualRegexps: [String.raw`HorizontalGrid`],
    },
  ],
  Button: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-react-update-button-component',
      name: 'Button boolean props',
      falsePositiveRegExp:
        'connectedDisclosure|destructive|outline|monochrome|plain|primary|primarySuccess',
      manualRegexps: [
        String.raw`<Button[^>\w](?:[^>]|\n)*?connectedDisclosure`,
        String.raw`<Button[^>\w](?:[^>]|\n)*?destructive`,
        String.raw`<Button[^>\w](?:[^>]|\n)*?outline`,
        String.raw`<Button[^\w>](?!(?:[^>]|\n)*?monochromePlain)(?:[^>]|\n)*?monochrome`,
        String.raw`<Button[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?plain`,
        String.raw`<Button[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?primary`,
        String.raw`<Button[^\w>](?!(?:[^>]|\n)*?variant)(?:[^>]|\n)*?primarySuccess`,
      ],
    },
  ],
  ButtonGroup: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName ButtonGroup --fromProp spacing --toProp gap',
      name: 'ButtonGroup spacing prop',
      falsePositiveRegExp: 'spacing',
      manualRegexps: [String.raw`<ButtonGroup[^>\w](?:[^>]|\n)*?spacing`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName ButtonGroup --fromPropType boolean --fromProp segmented --toProp variant --toValue segmented',
      name: 'ButtonGroup segmented prop',
      falsePositiveRegExp: 'segmented',
      manualRegexps: [String.raw`<ButtonGroup[^>\w](?:[^>]|\n)*?segmented`],
    },
  ],
  Banner: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Banner --fromProp status --toProp tone',
      name: 'Banner status prop',
      falsePositiveRegExp: 'status',
      manualRegexps: [
        String.raw`<Banner[^\w>](?!(?:[^>]|\n)*?tone)(?:[^>]|\n)*?status`,
      ],
    },
  ],
  Icon: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Icon --fromProp color --toProp tone --fromValue warning --toValue caution',
      name: 'Icon warning color',
      falsePositiveRegExp: 'warning',
      manualRegexps: [
        String.raw`<Icon[^>\w](?:[^>]|\n)*?color="warning"`,
        String.raw`<Icon[^>\w](?:[^>]|\n)*?tone="warning"`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Icon --fromProp color --toProp tone --fromValue highlight --toValue info',
      name: 'Icon highlight color',
      falsePositiveRegExp: 'highlight',
      manualRegexps: [
        String.raw`<Icon[^>\w](?:[^>]|\n)*?color="highlight"`,
        String.raw`<Icon[^>\w](?:[^>]|\n)*?tone="highlight"`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Icon --fromProp color --toProp tone',
      name: 'Icon color',
      falsePositiveRegExp: 'color',
      manualRegexps: [String.raw`<Icon[^>\w](?:[^>]|\n)*?color`],
    },
  ],
  Text: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Text --fromProp color --toProp tone --fromValue warning --toValue caution',
      name: 'Text warning color',
      falsePositiveRegExp: 'warning',
      manualRegexps: [
        String.raw`<Text[^>\w](?:[^>]|\n)*?color="warning"`,
        String.raw`<Text[^>\w](?:[^>]|\n)*?tone="warning"`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Text --fromProp color --toProp tone',
      name: 'Text color',
      falsePositiveRegExp: 'color',
      manualRegexps: [String.raw`<Text[^>\w](?:[^>]|\n)*?color`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Text --fromProp variant --fromValue headingXs --toValue headingSm',
      name: 'Text headingXs variant',
      falsePositiveRegExp: 'headingXs',
      manualRegexps: [String.raw`<Text[^>\w](?:[^>]|\n)*?variant="headingXs"`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Text --fromProp variant --fromValue heading4xl --toValue heading3xl',
      name: 'Text heading4xl variant',
      falsePositiveRegExp: 'heading4xl',
      manualRegexps: [String.raw`<Text[^>\w](?:[^>]|\n)*?variant="heading4xl"`],
    },
  ],
  Modal: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Modal --fromPropType boolean --fromProp small --toProp size --toValue small',
      name: 'Modal small prop',
      falsePositiveRegExp: 'small',
      manualRegexps: [String.raw`<Modal[^>\w](?:[^>]|\n)*?small`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Modal --fromPropType boolean --fromProp large --toProp size --toValue large',
      name: 'Modal large prop',
      falsePositiveRegExp: 'large',
      manualRegexps: [String.raw`<Modal[^>\w](?:[^>]|\n)*?large`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName Modal --fromPropType boolean --fromProp fullScreen --toProp size --toValue fullScreen',
      name: 'Modal fullScreen prop',
      falsePositiveRegExp: 'fullScreen',
      manualRegexps: [String.raw`<Modal[^>\w](?:[^>]|\n)*?fullScreen`],
    },
  ],
  List: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName List --fromProp spacing --toProp gap',
      name: 'List spacing prop',
      falsePositiveRegExp: 'spacing',
      manualRegexps: [String.raw`<List[^>\w](?:[^>]|\n)*?spacing`],
    },
  ],
  DescriptionList: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName DescriptionList --fromProp spacing --toProp gap',
      name: 'DescriptionList spacing prop',
      falsePositiveRegExp: 'spacing',
      manualRegexps: [String.raw`<DescriptionList[^>\w](?:[^>]|\n)*?spacing`],
    },
  ],
  ProgressBar: [
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator react-update-component-prop --componentName ProgressBar --fromProp color --toProp tone',
      name: 'ProgressBar color',
      falsePositiveRegExp: 'color',
      manualRegexps: [String.raw`<ProgressBar[^>\w](?:[^>]|\n)*?color`],
    },
  ],
  border: [
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-border',
      name: 'border CSS custom properties',
      manualRegexps: [
        String.raw`(?:--p-border-radius-0-experimental|--p-border-radius-05(?!.*0.*)|--p-border-radius-1(?!.*0.*)|--p-border-radius-1_5-experimental|--p-border-radius-2(?!.*0.*)|--p-border-radius-3(?!.*0.*)|--p-border-radius-4(?!.*0.*)|--p-border-radius-5(?!.*0.*)|--p-border-radius-6(?!.*0.*)|--p-border-width-1(?!.*0.*)|--p-border-width-1-experimental|--p-border-width-2(?!.*0.*)|--p-border-width-2-experimental|--p-border-width-3(?!.*0.*)|--p-border-width-4(?!.*0.*)|--p-border-width-5(?!.*0.*))(?![\w-])`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator@0.0.0-snapshot-release-20231013194159 v12-react-update-component-prop-border-radius',
      name: 'border-radius component prop token aliases',
      falsePositiveRegExp: String.raw`(?:0-experimental|05(?!.*0.*)|1(?!.*0.*)|1_5-experimental|2(?!.*0.*)|3(?!.*0.*)|4(?!.*0.*)|5(?!.*0.*)|6(?!.*0.*)(?!.*0.*))(?![\w-])`,
      manualRegexps: [
        String.raw`<Tooltip[^>\w](?:[^>]|\n)*?borderRadius`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderRadius`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderEndStartRadius`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderEndEndRadius`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderStartEndRadius`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderStartEndRadius`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator@0.0.0-snapshot-release-20231013194159 v12-react-update-component-prop-border-width',
      name: 'border-width component prop token aliases',
      falsePositiveRegExp: String.raw`(?:1(?!.*0.*)|1-experimental|2(?!.*0.*)|2-experimental|3(?!.*0.*)|4(?!.*0.*)|5(?!.*0.*))(?![\w-])`,
      manualRegexps: [
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderWidth`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderBlockStartWidth`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderBlockEndWidth`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderInlineStartWidth`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderInlineEndWidth`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?outlineWidth`,
        String.raw`<Divider[^>\w](?:[^>]|\n)*?borderWidth`,
      ],
    },
  ],
  color: [
    {
      fileExt: '{css,scss,ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-color --step=1',
      name: 'color CSS custom properties step 1',
      manualRegexps: [
        String.raw`(?:--p-color-avatar-background-experimental|--p-color-avatar-color-experimental|--p-color-avatar-style-five-background-experimental|--p-color-avatar-style-five-color-experimental|--p-color-avatar-style-four-background-experimental|--p-color-avatar-style-four-color-experimental|--p-color-avatar-style-one-background-experimental|--p-color-avatar-style-one-color-experimental|--p-color-avatar-style-three-background-experimental|--p-color-avatar-style-three-color-experimental|--p-color-avatar-style-two-background-experimental|--p-color-avatar-style-two-color-experimental|--p-color-bg|--p-color-bg-active|--p-color-bg-app-active|--p-color-bg-app-hover|--p-color-bg-app-selected|--p-color-bg-backdrop-experimental|--p-color-bg-caution|--p-color-bg-caution-strong|--p-color-bg-caution-subdued|--p-color-bg-caution-subdued-active|--p-color-bg-caution-subdued-hover|--p-color-bg-critical|--p-color-bg-critical-strong|--p-color-bg-critical-strong-active|--p-color-bg-critical-strong-hover|--p-color-bg-critical-subdued|--p-color-bg-critical-subdued-active|--p-color-bg-critical-subdued-hover|--p-color-bg-disabled|--p-color-bg-hover|--p-color-bg-info|--p-color-bg-info-strong|--p-color-bg-info-subdued|--p-color-bg-info-subdued-active|--p-color-bg-info-subdued-hover|--p-color-bg-input|--p-color-bg-input-active-experimental|--p-color-bg-input-hover-experimental|--p-color-bg-inset|--p-color-bg-inset-strong|--p-color-bg-interactive|--p-color-bg-interactive-active|--p-color-bg-interactive-disabled|--p-color-bg-interactive-hover|--p-color-bg-interactive-selected|--p-color-bg-interactive-subdued|--p-color-bg-interactive-subdued-active|--p-color-bg-interactive-subdued-hover|--p-color-bg-inverse-active|--p-color-bg-inverse-hover|--p-color-bg-magic|--p-color-bg-magic-active|--p-color-bg-magic-hover|--p-color-bg-magic-strong|--p-color-bg-magic-subdued|--p-color-bg-magic-subdued-hover|--p-color-bg-primary|--p-color-bg-primary-active|--p-color-bg-primary-disabled-experimental|--p-color-bg-primary-hover|--p-color-bg-primary-subdued|--p-color-bg-primary-subdued-active|--p-color-bg-primary-subdued-hover|--p-color-bg-primary-subdued-selected|--p-color-bg-secondary-experimental|--p-color-bg-strong|--p-color-bg-strong-active|--p-color-bg-strong-hover|--p-color-bg-subdued|--p-color-bg-subdued-active|--p-color-bg-subdued-hover|--p-color-bg-success|--p-color-bg-success-strong|--p-color-bg-success-strong-active-experimental|--p-color-bg-success-strong-hover-experimental|--p-color-bg-success-subdued|--p-color-bg-success-subdued-active|--p-color-bg-success-subdued-hover|--p-color-bg-transparent-active-experimental|--p-color-bg-transparent-disabled-experimental|--p-color-bg-transparent-experimental|--p-color-bg-transparent-hover-experimental|--p-color-bg-transparent-primary-disabled-experimental|--p-color-bg-transparent-subdued-experimental|--p-color-bg-warning|--p-color-bg-warning-strong-experimental|--p-color-bg-warning-subdued-experimental|--p-color-border-critical-strong-experimental|--p-color-border-input|--p-color-border-input-active-experimental|--p-color-border-input-hover|--p-color-border-interactive|--p-color-border-interactive-active|--p-color-border-interactive-disabled|--p-color-border-caution-subdued|--p-color-border-critical-active|--p-color-border-critical-hover|--p-color-border-critical-subdued|--p-color-border-info-subdued|--p-color-border-interactive-focus|--p-color-border-interactive-hover|--p-color-border-magic-strong|--p-color-border-primary|--p-color-border-strong|--p-color-border-strong-hover|--p-color-border-subdued|--p-color-border-success-subdued|--p-color-icon-interactive|--p-color-icon-interactive-active|--p-color-icon-interactive-hover|--p-color-icon-info-strong-experimental|--p-color-icon-interactive-disabled|--p-color-icon-primary|--p-color-icon-subdued|--p-color-icon-critical-strong-experimental|--p-color-icon-critical-strong-active-experimental|--p-color-icon-critical-strong-hover-experimental|--p-color-icon-success-strong-experimental|--p-color-icon-warning-strong-experimental|--p-color-text-critical-hover-experimental|--p-color-text-info-strong|--p-color-text-interactive|--p-color-text-interactive-active|--p-color-text-interactive-disabled|--p-color-text-interactive-hover|--p-color-text-interactive-inverse|--p-color-text-inverse-subdued|--p-color-text-primary|--p-color-text-primary-hover|--p-color-text-caution-strong|--p-color-text-critical-strong|--p-color-text-magic-strong|--p-color-text-success-strong|--p-color-text-subdued|--p-color-text-warning-experimental)(?![\w-])`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator@0.0.0-snapshot-release-20231013194159 v12-react-update-component-prop-color --step=1',
      name: 'component prop color token aliases step 1',
      falsePositiveRegExp: String.raw`background|outlineColor|borderColor|textColor|color`,
      manualRegexps: [
        String.raw`<Box[^>\w](?:[^>]|\n)*?background`,
        String.raw`<Card[^>\w](?:[^>]|\n)*?background`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderColor`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?outlineColor`,
        String.raw`<Divider[^>\w](?:[^>]|\n)*?borderColor`,
        String.raw`<Banner[^>\w](?:[^>]|\n)*?textColor`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?color`,
      ],
    },
    {
      fileExt: '{css,scss,ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-color --step=2',
      name: 'color CSS custom properties step 2',
      manualRegexps: [String.raw`(?:--p-color-bg-app)(?![\w-])`],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator@0.0.0-snapshot-release-20231013194159 v12-react-update-component-prop-color --step=2',
      name: 'component prop color token aliases step 2',
      falsePositiveRegExp: String.raw`background|outlineColor|borderColor|textColor|color`,
      manualRegexps: [
        'STEP 2 REGEXP:',
        String.raw`<Box[^>\w](?:[^>]|\n)*?background`,
        String.raw`<Card[^>\w](?:[^>]|\n)*?background`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderColor`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?outlineColor`,
        String.raw`<Divider[^>\w](?:[^>]|\n)*?borderColor`,
        String.raw`<Banner[^>\w](?:[^>]|\n)*?textColor`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?color`,
        'STEP 3 REGEXP:',
        String.raw`(?:--p-color-bg-transparent-primary-experimental|--p-color-bg-transparent-secondary-disabled-experimental|--p-color-icon-on-color|--p-color-text-on-color)(?![\w-])`,
        'STEP 4 REGEXP',
        String.raw`<Box[^>\w](?:[^>]|\n)*?background`,
        String.raw`<Card[^>\w](?:[^>]|\n)*?background`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?borderColor`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?outlineColor`,
        String.raw`<Divider[^>\w](?:[^>]|\n)*?borderColor`,
        String.raw`<Banner[^>\w](?:[^>]|\n)*?textColor`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?color`,
      ],
    },
  ],
  font: [
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-font --step=1',
      name: 'font CSS custom properties step 1',
      manualRegexps: [
        String.raw`(?:--p-font-size-70(?!.*0.*)-experimental|--p-font-size-80(?!.*0.*)-experimental|--p-font-size-100|--p-font-size-700|--p-font-line-height-075(?!.*0.*)-experimental|--p-font-line-height-1(?!.*0.*)|--p-font-line-height-2(?!.*0.*)|--p-font-line-height-3(?!.*0.*)|--p-font-line-height-4(?!.*0.*)|--p-font-line-height-5(?!.*0.*)|--p-font-line-height-6(?!.*0.*)|--p-font-line-height-7(?!.*0.*))(?![\w-])`,
      ],
    },
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-font --step=2',
      name: 'font CSS custom properties step 2',
      manualRegexps: [
        String.raw`(?:--p-font-size-500|--p-font-size-600)(?![\w-])`,
      ],
    },
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-font --step=3',
      name: 'font CSS custom properties step 3',
      manualRegexps: [
        String.raw`(?:--p-font-size-300|--p-font-size-400)(?![\w-])`,
      ],
    },
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-font --step=4',
      name: 'font CSS custom properties step 4',
      manualRegexps: [
        String.raw`(?:--p-font-size-75|--p-font-size-200)(?![\w-])`,
      ],
    },
  ],
  shadow: [
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-shadow',
      name: 'shadow CSS custom properties step 1',
      manualRegexps: [
        String.raw`(?:--p-shadow-inset-lg|--p-shadow-inset-md|--p-shadow-inset-sm|--p-shadow-none|--p-shadow-xs|--p-shadow-sm|--p-shadow-md|--p-shadow-lg|--p-shadow-xl|--p-shadow-2xl|--p-shadow-bevel-experimental|--p-shadow-card-sm-experimental|--p-shadow-card-md-experimental|--p-shadow-card-lg-experimental|--p-shadow-button-experimental|--p-shadow-button-hover-experimental|--p-shadow-button-disabled-experimental|--p-shadow-button-primary-strong-experimental|--p-shadow-button-primary-strong-inset-experimental|--p-shadow-button-primary-strong-hover-experimental|--p-shadow-border-inset-experimental)(?![\w-])`,
        String.raw`(?:inset-lg|inset-md|inset-sm|none|xs|sm|md|lg|xl|2xl|bevel-experimental|card-sm-experimental|card-md-experimental|card-lg-experimental|button-experimental|button-hover-experimental|button-disabled-experimental|button-primary-strong-experimental|button-primary-strong-inset-experimental|button-primary-strong-hover-experimental|border-inset-experimental)(?![\w-])`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator@0.0.0-snapshot-release-20231013194159 v12-react-update-component-prop-shadow',
      name: 'component prop shadow token aliases step 1',
      falsePositiveRegExp: String.raw`shadow`,
      manualRegexps: [
        'STEP 1 prop token REGEXP',
        String.raw`<Box[^>\w](?:[^>]|\n)*?shadow`,
        'STEP 2 custom properties REGEXP',
        String.raw`(?:--p-shadow-button-primary-experimental|--p-shadow-button-primary-hover-experimental|--p-shadow-button-inset-experimental)(?![\w-])`,
        'STEP 2 prop token REGEXP',
        String.raw`<Box[^>\w](?:[^>]|\n)*?shadow`,
      ],
    },
  ],
  space: [
    {
      fileExt: '{css,scss}',
      migratorCommand:
        'npx @shopify/polaris-migrator v12-styles-replace-custom-property-space',
      name: 'space CSS custom properties',
      manualRegexps: [
        String.raw`(?:--p-space-05(?!.*0.*)|--p-space-1(?!.*0.*)|--p-space-1_5-experimental(?!.*0.*)|--p-space-2(?!.*0.*)|--p-space-3(?!.*0.*)|--p-space-4(?!.*0.*)|--p-space-5(?!.*0.*)|--p-space-6(?!.*0.*)|--p-space-8(?!.*0.*)|--p-space-10(?!.*0.*)|--p-space-12(?!.*0.*)|--p-space-16(?!.*0.*)|--p-space-20(?!.*0.*)|--p-space-24(?!.*0.*)|--p-space-28(?!.*0.*)|--p-space-32(?!.*0.*))(?![\w-])`,
      ],
    },
    {
      fileExt: '{ts,tsx}',
      migratorCommand:
        'npx @shopify/polaris-migrator@0.0.0-snapshot-release-20231013194159 v12-react-update-component-prop-space',
      name: 'component prop space token aliases',
      falsePositiveRegExp: String.raw`padding|gap|paddingBlockStart|paddingBlockEnd|paddingInlineStart|paddingInlineEnd|insetBlockStart|insetBlockEnd|insetInlineStart|insetInlineEnd|bleed|bleedBlockStart|bleedBlockEnd|bleedInlineStart|bleedInlineEnd|gapX|gapY|marginInline|marginBlock|marginBlockStart|marginBlockEnd|marginInlineStart|marginInlineEnd`,
      manualRegexps: [
        String.raw`<Tooltip[^>\w](?:[^>]|\n)*?padding`,
        String.raw`<InlineGrid[^>\w](?:[^>]|\n)*?gap`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?padding`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?paddingBlockStart`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?paddingBlockEnd`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?paddingInlineStart`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?paddingInlineEnd`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?insetBlockStart`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?insetBlockEnd`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?insetInlineStart`,
        String.raw`<Box[^>\w](?:[^>]|\n)*?insetInlineEnd`,
        String.raw`<BlockStack[^>\w](?:[^>]|\n)*?gap`,
        String.raw`<InlineStack[^>\w](?:[^>]|\n)*?gap`,
        String.raw`<Choice[^>\w](?:[^>]|\n)*?bleed`,
        String.raw`<Choice[^>\w](?:[^>]|\n)*?bleedBlockStart`,
        String.raw`<Choice[^>\w](?:[^>]|\n)*?bleedBlockEnd`,
        String.raw`<Choice[^>\w](?:[^>]|\n)*?bleedInlineStart`,
        String.raw`<Choice[^>\w](?:[^>]|\n)*?bleedInlineEnd`,
        String.raw`<RadioButton[^>\w](?:[^>]|\n)*?bleed`,
        String.raw`<RadioButton[^>\w](?:[^>]|\n)*?bleedBlockStart`,
        String.raw`<RadioButton[^>\w](?:[^>]|\n)*?bleedBlockEnd`,
        String.raw`<RadioButton[^>\w](?:[^>]|\n)*?bleedInlineStart`,
        String.raw`<RadioButton[^>\w](?:[^>]|\n)*?bleedInlineEnd`,
        String.raw`<Checkbox[^>\w](?:[^>]|\n)*?bleed`,
        String.raw`<Checkbox[^>\w](?:[^>]|\n)*?bleedBlockStart`,
        String.raw`<Checkbox[^>\w](?:[^>]|\n)*?bleedBlockEnd`,
        String.raw`<Checkbox[^>\w](?:[^>]|\n)*?bleedInlineStart`,
        String.raw`<Checkbox[^>\w](?:[^>]|\n)*?bleedInlineEnd`,
        String.raw`<Stack[^>\w](?:[^>]|\n)*?gap`,
        String.raw`<Grid[^>\w](?:[^>]|\n)*?gap`,
        String.raw`<Grid[^>\w](?:[^>]|\n)*?gapX`,
        String.raw`<Grid[^>\w](?:[^>]|\n)*?gapY`,
        String.raw`<Card[^>\w](?:[^>]|\n)*?padding`,
        String.raw`<Bleed[^>\w](?:[^>]|\n)*?marginInline`,
        String.raw`<Bleed[^>\w](?:[^>]|\n)*?marginBlock`,
        String.raw`<Bleed[^>\w](?:[^>]|\n)*?marginBlockStart`,
        String.raw`<Bleed[^>\w](?:[^>]|\n)*?marginBlockEnd`,
        String.raw`<Bleed[^>\w](?:[^>]|\n)*?marginInlineStart`,
        String.raw`<Bleed[^>\w](?:[^>]|\n)*?marginInlineEnd`,
      ],
    },
  ],
};

await pullLatestMain();
await mergeMainAndCreateSymlinkedDir();
await processMigrations();
await cleanUp();

async function exec(
  /** @type {string} */ command,
  /** @type {import('execa').CommonOptions} */ options,
) {
  await execa.command(command, {
    stdio: 'inherit',
    ...options,
  });
}

function escape(string) {
  return string.replace(/ /g, '\\ ');
}

async function processMigrations() {
  const keys = Object.keys(migrations);
  for (const component of keys) {
    await processMigration(component);
  }
}

async function pullLatestMain() {
  await exec('git checkout main');
  await exec('git pull origin main');
  await exec(`git checkout -`);
}

function waitForContinue(message) {
  console.log(`\u001b[32m\n\n${message}\n\n`);
  console.log(
    '\u001b[35m❗️ DO NOT COMMIT, the script will do that for you.\n\n',
  );
  const answer = readlineSync.question(
    `\u001b[32mEnter "continue" when done: `,
  );
  if (answer.toLowerCase() === 'continue') {
    console.log('\u001b[36m \n💨 Continuing...');
  } else {
    waitForContinue();
  }
}

async function cleanUp() {
  await fs.rm(tempMigrationDir, {recursive: true, force: true});
  await exec('git add .');
  await exec(
    `git commit -m ${escape('Remove temp migration symlink directory')}`,
    {
      reject: false,
    },
  );
}

async function mergeMainAndCreateSymlinkedDir() {
  await exec('git merge --no-commit -X theirs main', {
    reject: false,
  });

  await exec('git diff --name-only --diff-filter=U | xargs git rm', {
    shell: true,
    reject: false,
  });

  await exec('git restore --staged .');

  try {
    await exec('git rm $(git ls-files --deleted)', {
      shell: true,
    });

    await exec(`git commit -m ${escape('Merge main -- deleted files')}`, {
      reject: false,
    });
  } catch (error) {
    // console.log('No deleted files');
  }

  await exec('git add .');

  await exec(
    String.raw`git diff --staged --name-only | grep -E '\.(ts|tsx)$' > file-list-ts.txt`,
    {
      shell: true,
    },
  );

  await exec(
    String.raw`git diff --staged --name-only | grep -E '\.(scss|css)$' > file-list-styles.txt`,
    {
      shell: true,
    },
  );

  await exec('cat file-list-ts.txt | xargs git checkout origin/main --', {
    shell: true,
    reject: false,
  });

  await exec(`git commit -m ${escape('Reset TypeScript files')}`, {
    reject: false,
  });

  await exec('cat file-list-styles.txt | xargs git checkout origin/main --', {
    shell: true,
    reject: false,
  });

  await exec(`git commit -m ${escape('Reset stylesheet files')}`, {
    reject: false,
  });

  await fs.rm(tempMigrationDir, {recursive: true, force: true});
  await fs.mkdir(tempMigrationDir, {recursive: true}).catch((error) => {
    if (error.code !== 'EEXIST') throw error;
  });

  const [fileListTS, fileListStyles] = await Promise.all([
    fs.readFile('./file-list-ts.txt', 'utf8'),
    fs.readFile('./file-list-styles.txt', 'utf8'),
  ]);

  await Promise.all(
    [
      ...fileListTS.split('\n').filter(Boolean),
      ...fileListStyles.split('\n').filter(Boolean),
    ].map(async (filePath) => {
      await fs.symlink(
        path.join(__dirname, filePath),
        path.join(tempMigrationDir, filePath.replace(/\//g, '-')),
      );
    }),
  );

  await exec('rm ./file-list-ts.txt');

  await exec('rm ./file-list-styles.txt');

  await exec('git add .');

  await exec(
    `git commit -m ${escape(
      'Add symlinked files to temp-migrations directory with changed files from main',
    )}`,
    {
      reject: false,
    },
  );
}

async function processMigration(componentOrToken) {
  for (const migration of migrations[componentOrToken]) {
    console.log(`\u001b[36m \n🤖 ${migration.name} automatic migration...`);

    // Run automated migration
    await exec(
      `${migration.migratorCommand} --force ${escape(
        `'${tempMigrationDir}/*.${migration.fileExt}'`,
      )}`,
    );

    // Check if there are any modified files
    const {stdout: modifiedFiles} = await execa.command('git ls-files -m');

    if (modifiedFiles) {
      // Stage all migrated files without "polaris-migrator:" comments if they exist
      const {stdout: commentFiles} = await execa.command(
        String.raw`grep -r -l "polaris-migrator:" $(git ls-files -m)`,
        {shell: true, reject: false},
      );

      if (commentFiles) {
        await execa.command(
          String.raw`git stash push $(grep -r -l "polaris-migrator:" $(git ls-files -m))`,
          {shell: true, reject: false},
        );
      }

      // Format staged files only
      await exec('git add .');
      await exec('git diff --staged --name-only | xargs npx prettier --write', {
        shell: true,
        reject: false,
      });

      // Commit automatic migrations
      await commit(
        `Automatically migrate ${migration.name} from Polaris v11 to v12`,
      );

      // Bring back migrator comment files and manually migrate
      if (commentFiles) {
        await exec('git stash pop', {reject: false});

        if (migration.falsePositiveRegExp) {
          await exec(
            String.raw`grep -r -l "polaris-migrator:" $(git ls-files -m) | grep -E '.+\.test\..+' | xargs -n 10 sh -c 'for file do cat "$file" | grep -qE "${migration.falsePositiveRegExp}" || git checkout -- "$file"; done' sh`,
            {shell: true, reject: false},
          );
        }

        const {stdout: filteredCommentFiles} = await execa.command(
          'git ls-files -m',
        );

        if (filteredCommentFiles) {
          waitForContinue(
            `Manually resolve "polaris-migrator:" comments for ${migration.name}.`,
          );
          await commit(
            `Manually migrate ${migration.name} from Polaris v11 to v12`,
          );
        }
      }
    }

    // Manually check regexp
    waitForContinue(
      `Manually double check for outdated ${
        migration.name
      } by searching for:\u001b[33m\n\n\n${migration.manualRegexps.join(
        '\n\n',
      )}`,
    );

    await commit(
      `Manually migrate ${migration.name} from Polaris v11 to v12 -- RegExp`,
    );
  }
}

async function commit(message) {
  await exec('git restore --staged .');
  const {stdout: files} = await execa.command('git ls-files -m');

  if (files) {
    await exec('git add .');
    await exec(`git commit -m ${escape(message)}`, {
      reject: false,
    });
  }
}
