import React from 'react';
import ReactWebComponent from 'react-web-component';

import {TextStyle, Card} from '../src';

ReactWebComponent.create(<TextStyle />, 'text-style2');

export function WebComponents2() {
  return (
    <div>
      <text-style2 variation="positive">text style content</text-style2>
    </div>
  );
}
