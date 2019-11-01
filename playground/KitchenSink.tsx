import React from 'react';
import {Page} from '../src';
// eslint-disable-next-line import/namespace
import * as Stories from './stories';

export function KitchenSink() {
  const exclude = new RegExp(
    'AllExamples|frame|theme|ContextualSaveBar|topbar|defaultloading|modal|sheet',
    'i',
  );
  const keys = Object.keys(Stories);

  return keys
    .filter((key) => key.match(exclude) == null)
    .map((key, index) => {
      // eslint-disable-next-line import/namespace
      const JsxProxy = Stories[key];
      return (
        <div key={index}>
          <JsxProxy />
          <hr
            style={{
              border: 'none',
              borderTop: '2px dotted magenta',
              margin: 20,
              opacity: 0.5,
            }}
          />
        </div>
      );
    });
}
