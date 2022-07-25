import React from 'react';
import ReactWebComponent from 'react-web-component';

import {TextStyle, Card} from '../src';

ReactWebComponent.create(<TextStyle />, 'text-style');
ReactWebComponent.create(<Card />, 'ui-card');

export function WebComponents2() {
  return (
    <div>
      <ui-card title="test title">card content </ui-card>
      <text-style variation="positive">text style content</text-style>
    </div>
  );
}
