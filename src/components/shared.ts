export const scrollable = {
  props: {'data-polaris-scrollable': true},
  selector: '[data-polaris-scrollable]',
};

export const overlay = {
  props: {'data-polaris-overlay': true},
  selector: '[data-polaris-overlay]',
};

export const layer = {
  props: {'data-polaris-layer': true},
  selector: '[data-polaris-layer]',
};

export const unstyled = {
  props: {'data-polaris-unstyled': true},
  selector: '[data-polaris-unstyled]',
};

export const dataPolarisTopBar = {
  props: {'data-polaris-top-bar': true},
  selector: '[data-polaris-top-bar]',
};

// these match our values in duration.scss
export enum Duration {
  Instant = 0,
  Fast = 100,
  Base = 200,
  Slow = 300,
  Slower = 400,
  Slowest = 500,
}
