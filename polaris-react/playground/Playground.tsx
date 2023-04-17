import {
  ArchiveMinor,
  CaretDownMinor,
  CirclePlusMinor,
  EditMajor,
  SelectMinor,
} from '@shopify/polaris-icons';
import React from 'react';

import {
  ButtonNew,
  AlphaCard,
  VerticalStack,
  Bleed,
  Box,
  ButtonBase,
  Icon,
  HorizontalStack,
  Page,
  Text,
} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <VerticalStack gap="4">
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonBase>Button Base</ButtonBase>
          <ButtonBase as="a" to="#">
            Button Base Link
          </ButtonBase>
          <ButtonBase>
            <Icon source={EditMajor} color="base" />
          </ButtonBase>
        </HorizontalStack>

        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew>
            <HorizontalStack gap="2" blockAlign="center">
              <Icon source={CirclePlusMinor} color="base" />
              Label text
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew>Label text</ButtonNew>
          <ButtonNew>
            <HorizontalStack blockAlign="center">
              Disclosure
              <Icon source={CaretDownMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew>
            <HorizontalStack blockAlign="center">
              Select disclosure
              <Icon source={SelectMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
        </HorizontalStack>
        <VerticalStack gap="4">
          <ButtonNew>
            <HorizontalStack blockAlign="center" align="space-between">
              Right Aligned Disclosure
              <div>
                <Icon source={CaretDownMinor} color="base" />
              </div>
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew>Full width button</ButtonNew>
          <ButtonNew>
            <HorizontalStack gap="2" blockAlign="center" align="center">
              <div>
                <Icon source={ArchiveMinor} color="base" />
              </div>
              Archive product
            </HorizontalStack>
          </ButtonNew>
        </VerticalStack>
        <Text as="h2" variant="headingMd">
          Size
        </Text>
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew size="small">Small</ButtonNew>
          <ButtonNew>Medium</ButtonNew>
          <ButtonNew>Hover</ButtonNew>
          <ButtonNew>Active</ButtonNew>
          <ButtonNew disabled>Disabled</ButtonNew>
          <ButtonNew size="large">Large</ButtonNew>
        </HorizontalStack>
        <Text as="h2" variant="headingMd">
          Tone critical
        </Text>
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew size="small" tone="critical">
            Small
          </ButtonNew>
          <ButtonNew tone="critical">Medium</ButtonNew>
          <ButtonNew tone="critical" disabled>
            Disabled
          </ButtonNew>
          <ButtonNew size="large" tone="critical">
            Large
          </ButtonNew>
          <ButtonNew tone="critical">
            <HorizontalStack blockAlign="center">
              Select disclosure
              <Icon source={SelectMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
        </HorizontalStack>
        <Text as="h2" variant="headingMd">
          Primary
        </Text>
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew variant="primary">Primary</ButtonNew>
          <ButtonNew variant="primary">Hover</ButtonNew>
          <ButtonNew variant="primary">Active</ButtonNew>
          <ButtonNew variant="primary" disabled>
            Primary disabled
          </ButtonNew>
          <ButtonNew variant="primary">
            <HorizontalStack blockAlign="center">
              Disclosure
              <Icon source={CaretDownMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew size="small" variant="primary">
            Small
          </ButtonNew>
          <ButtonNew size="large" variant="primary">
            Large
          </ButtonNew>
        </HorizontalStack>
        <Text as="h2" variant="headingMd">
          Primary with tone critical
        </Text>
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew variant="primary" tone="critical">
            Primary
          </ButtonNew>
          <ButtonNew variant="primary" tone="critical" disabled>
            Disabled
          </ButtonNew>
          <ButtonNew variant="primary" tone="critical">
            <HorizontalStack blockAlign="center">
              Disclosure
              <Icon source={CaretDownMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew size="small" variant="primary" tone="critical">
            Small
          </ButtonNew>
          <ButtonNew size="large" variant="primary" tone="critical">
            Large
          </ButtonNew>
        </HorizontalStack>
        <Text as="h2" variant="headingMd">
          Transparent
        </Text>
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew variant="transparent">Transparent</ButtonNew>
          <ButtonNew variant="transparent">Hover</ButtonNew>
          <ButtonNew variant="transparent">Active</ButtonNew>
          <ButtonNew variant="transparent" disabled>
            Disabled
          </ButtonNew>
          <ButtonNew variant="transparent">
            <HorizontalStack blockAlign="center">
              Disclosure
              <Icon source={CaretDownMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew size="small" variant="transparent">
            Small
          </ButtonNew>
          <ButtonNew size="large" variant="transparent">
            Large
          </ButtonNew>
        </HorizontalStack>
        <Text as="h2" variant="headingMd">
          Transparent with tone critical
        </Text>
        <HorizontalStack gap="2" blockAlign="start">
          <ButtonNew variant="transparent" tone="critical">
            Transparent
          </ButtonNew>
          <ButtonNew variant="transparent" tone="critical" disabled>
            Disabled
          </ButtonNew>
          <ButtonNew variant="transparent" tone="critical">
            <HorizontalStack blockAlign="center">
              Disclosure
              <Icon source={CaretDownMinor} color="base" />
            </HorizontalStack>
          </ButtonNew>
          <ButtonNew size="small" variant="transparent" tone="critical">
            Small
          </ButtonNew>
          <ButtonNew size="large" variant="transparent" tone="critical">
            Large
          </ButtonNew>
        </HorizontalStack>
        <AlphaCard>
          <VerticalStack gap="4">
            <HorizontalStack gap="2">
              <ButtonNew>Click Me</ButtonNew>
              <ButtonNew disabled>Click Me</ButtonNew>
              <ButtonNew tone="critical">Click Me</ButtonNew>
              <ButtonNew tone="critical" disabled>
                Click Me
              </ButtonNew>
              <ButtonNew variant="transparent">Click Me</ButtonNew>
              <ButtonNew variant="transparent" disabled>
                Click Me
              </ButtonNew>
              <ButtonNew variant="primary">Click Me</ButtonNew>
              <ButtonNew variant="primary" disabled>
                Click Me
              </ButtonNew>
            </HorizontalStack>
            <Bleed marginInline="5">
              <Box background="bg-subdued" padding="4">
                <HorizontalStack gap="2">
                  <ButtonNew>Click Me</ButtonNew>
                  <ButtonNew disabled>Click Me</ButtonNew>
                  <ButtonNew tone="critical">Click Me</ButtonNew>
                  <ButtonNew tone="critical" disabled>
                    Click Me
                  </ButtonNew>
                  <ButtonNew variant="transparent">Click Me</ButtonNew>
                  <ButtonNew variant="transparent" disabled>
                    Click Me
                  </ButtonNew>
                  <ButtonNew variant="primary">Click Me</ButtonNew>
                  <ButtonNew variant="primary" disabled>
                    Click Me
                  </ButtonNew>
                </HorizontalStack>
              </Box>
            </Bleed>
            <Bleed marginBlockEnd="5" marginInline="5">
              <Box background="bg-inverse" padding="4">
                <HorizontalStack gap="2">
                  <ButtonNew>Click Me</ButtonNew>
                  <ButtonNew disabled>Click Me</ButtonNew>
                  <ButtonNew tone="critical">Click Me</ButtonNew>
                  <ButtonNew tone="critical" disabled>
                    Click Me
                  </ButtonNew>
                  <ButtonNew variant="transparent">Click Me</ButtonNew>
                  <ButtonNew variant="transparent" disabled>
                    Click Me
                  </ButtonNew>
                  <ButtonNew variant="primary">Click Me</ButtonNew>
                  <ButtonNew variant="primary" disabled>
                    Click Me
                  </ButtonNew>
                </HorizontalStack>
              </Box>
            </Bleed>
          </VerticalStack>
        </AlphaCard>
      </VerticalStack>
    </Page>
  );
}
