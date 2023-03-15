import type {ComponentMeta} from '@storybook/react';
import {ProgressBar} from '@shopify/polaris';

export default {
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

export function Default() {
  return <ProgressBar progress={75} />;
}

export function Small() {
  return <ProgressBar progress={40} size="small" />;
}

export function Colored() {
  return (
    <div>
      <ProgressBar progress={70} color="primary" />
      <br />
      <ProgressBar progress={30} color="success" />
    </div>
  );
}

export function NonAnimated() {
  return <ProgressBar progress={80} animated={false} />;
}
