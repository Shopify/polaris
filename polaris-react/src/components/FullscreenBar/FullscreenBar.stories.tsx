import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Badge,
  Button,
  ButtonGroup,
  DisplayText,
  FullscreenBar,
} from '@shopify/polaris';

export default {
  component: FullscreenBar,
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof FullscreenBar>;

export function WithChildren() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

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
        <Badge status="info">Draft</Badge>
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <DisplayText size="small">Page title</DisplayText>
        </div>
        <ButtonGroup>
          <Button onClick={() => {}}>Secondary Action</Button>
          <Button primary onClick={() => {}}>
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
        <DisplayText size="small">Page content</DisplayText>
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
        <DisplayText size="small">Page content</DisplayText>
      </div>
    </div>
  );
}
