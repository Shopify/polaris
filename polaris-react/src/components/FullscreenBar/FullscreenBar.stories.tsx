import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Badge,
  Button,
  ButtonGroup,
  FullscreenBar,
  Text,
  BlockStack,
} from '@shopify/polaris';

import {useBreakpoints} from '../../utilities/breakpoints';

export default {
  component: FullscreenBar,
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof FullscreenBar>;

export function All() {
  return (
    <>
      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          With children
        </Text>
        <WithChildren />
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h2" variant="headingXl">
          No children
        </Text>
        <NoChildren />
      </BlockStack>
    </>
  );
}

export function WithChildren() {
  const [isFullscreen, setFullscreen] = useState(true);
  const breakpoints = useBreakpoints();

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const titleContentMarkup = breakpoints.mdUp ? (
    <Text as="p" variant="headingMd">
      Join our email list
    </Text>
  ) : null;

  const titleMarkup = (
    <div
      style={{
        marginLeft: 'var(--p-space-200)',
        marginRight: 'var(--p-space-400)',
        flexGrow: 1,
      }}
    >
      {titleContentMarkup}
    </div>
  );

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <Badge tone="info">Draft</Badge>
        {titleMarkup}
        <ButtonGroup>
          <Button onClick={() => {}}>Secondary Action</Button>
          <Button variant="primary" onClick={() => {}}>
            Primary Action
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );

  return (
    <div style={{height: '250px'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <Text as="p" variant="headingLg">
          Page content
        </Text>
      </div>
    </div>
  );
}

export function NoChildren() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = <FullscreenBar onAction={handleActionClick} />;

  return (
    <div style={{height: '250px'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <Text as="p" variant="headingLg">
          Page content
        </Text>
      </div>
    </div>
  );
}
