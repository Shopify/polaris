import React from 'react';
import {Icon} from '@shopify/polaris';
import {CartAbandonedIcon} from '@shopify/polaris-icons';

const AbandonedCartFilledMajor = () => <svg />;

export function App() {
  return (
    <>
      <Icon source={CartAbandonedIcon} />
      <Icon source={AbandonedCartFilledMajor} />
    </>
  );
}
