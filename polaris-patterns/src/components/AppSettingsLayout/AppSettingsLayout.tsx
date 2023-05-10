import type {PropsWithChildren} from 'react';
import React from 'react';
import {
  VerticalStack,
  HorizontalGrid,
  AlphaCard,
  Box,
  Text,
  useBreakpoints,
  Divider,
} from '@shopify/polaris';

export const AppSettingsLayout: React.FunctionComponent<PropsWithChildren> & {
  AnnotatedSection: typeof AnnotatedSection;
  Card: typeof Card;
} = function AppSettingsLayout({children}: PropsWithChildren) {
  return <VerticalStack gap={{xs: '8', sm: '4'}}>{children}</VerticalStack>;
};

export interface AnnotatedSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  hideDivider?: boolean;
}

function AnnotatedSection({
  title,
  description,
  id,
  hideDivider,
  children,
}: PropsWithChildren<AnnotatedSectionProps>) {
  const {smUp} = useBreakpoints();
  const descriptionMarkup =
    typeof description === 'string' ? (
      <Text as="p" variant="bodyMd">
        {description}
      </Text>
    ) : (
      description
    );

  return (
    <>
      {smUp && !hideDivider ? <Divider /> : null}
      <HorizontalGrid columns={{xs: '1fr', md: '2fr 5fr'}} gap="4">
        <Box
          as="section"
          paddingInlineStart={{xs: '4', sm: '0'}}
          paddingInlineEnd={{xs: '4', sm: '0'}}
        >
          <VerticalStack gap="4">
            <Text as="h3" variant="headingMd" id={id}>
              {title}
            </Text>
            {description ? descriptionMarkup : null}
          </VerticalStack>
        </Box>
        {children}
      </HorizontalGrid>
    </>
  );
}

function Card({children}: PropsWithChildren) {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">{children}</VerticalStack>
    </AlphaCard>
  );
}

AppSettingsLayout.AnnotatedSection = AnnotatedSection;
AppSettingsLayout.Card = Card;
