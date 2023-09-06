import React from 'react';

import {Page, useThemeVars} from '../src';

export function Playground() {
  const themeVars = useThemeVars();

  console.log('themeVars:', themeVars);

  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
    </Page>
  );
}
