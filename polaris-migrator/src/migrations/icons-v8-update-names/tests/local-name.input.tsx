import React from 'react';
import {Icon} from '@shopify/polaris';
import {AbandonedCartMajor} from '@shopify/polaris-icons';

const AbandonedCartFilledMajor = () => <svg />;

export function App() {
  return (
    <>
      <Icon source={AbandonedCartMajor} />
      <Icon source={AbandonedCartFilledMajor} />
    </>
  );
}
