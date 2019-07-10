import {reduceTheme, ComponentThemeProperties} from '../ThemeProvider';

const baseComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-28',
    icon: '--polaris-surface-27',
    background: '--polaris-surface-3',
    gradient: ['--polaris-surface-3', '--polaris-surface-4'],
    border: '--polaris-surface-8',
  },
  hover: {
    background: '--polaris-surface-4',
    gradient: ['--polaris-surface-4', '--polaris-surface-5'],
    border: '--polaris-surface-8',
  },
  focus: {
    border: '--polaris-brand',
    shadow: '--polaris-brand',
  },
  active: {
    background: '--polaris-surface-1',
    gradient: ['--polaris-surface-1', '--polaris-surface-1'],
    border: '--polaris-surface-4',
    shadow: [
      '--polaris-surface-opposingOpacified2',
      '--polaris-surface-opposingOpacified3',
    ],
  },
  disabled: {
    text: '--polaris-surface-20',
    icon: '--polaris-surface-20',
    background: '--polaris-surface-1',
    gradient: ['--polaris-surface-1', '--polaris-surface-1'],
  },
};

const primaryComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-onDark',
    icon: '--polaris-surface-27',
    background: '--polaris-brand-lightened1',
    gradient: ['--polaris-brand-lightened1', '--polaris-brand-darkened1'],
    border: '--polaris-brand-darkened2',
    shadow: '--polaris-brand-lightened1',
  },
  hover: {
    background: '--polaris-brand',
    gradient: ['--polaris-brand', '--polaris-brand-darkened1'],
    border: '--polaris-brand-darkened2',
    text: '--polaris-surface-onDark',
  },
  focus: {
    border: '--polaris-brand-darkened5',
    shadow: ['--polaris-brand-lightened1', '--polaris-brand-darkened5'],
  },
  active: {
    background: '--polaris-brand-darkened2',
    gradient: ['--polaris-brand-darkened2', '--polaris-brand-darkened2'],
    border: '--polaris-brand-darkened3',
    shadow: '--polaris-brand-darkened3',
  },
  disabled: {
    text: 'polaris-surface-onDark',
    icon: 'polaris-surface-onDark',
    background: '--polaris-brand-lightened5',
    gradient: ['--polaris-brand-lightened5', '--polaris-brand-lightened5'],
    border: '--polaris-brand-lightened4',
  },
};

const destructiveComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-onDark',
    icon: 'polaris-surface-onDark',
    background: '--polaris-negative-lightened1',
    gradient: ['--polaris-negative-lightened1', '--polaris-negative-darkened1'],
    border: '--polaris-negative-darkened2',
    shadow: '--polaris-negative-lightened1',
  },
  hover: {
    background: '--polaris-negative',
    gradient: ['--polaris-negative', '--polaris-negative-darkened1'],
    border: '--polaris-negative-darkened2',
    text: 'polaris-surface-onDark',
  },
  focus: {
    border: '--polaris-negative-darkened5',
    shadow: ['--polaris-negative-lightened1', '--polaris-negative-darkened5'],
  },
  active: {
    background: '--polaris-negative-darkened2',
    gradient: ['--polaris-negative-darkened2', '--polaris-negative-darkened2'],
    border: '--polaris-negative-darkened3',
    shadow: '--polaris-negative-darkened3',
  },
  disabled: {
    text: 'polaris-surface-onDark',
    icon: 'polaris-surface-onDark',
    background: '--polaris-negative-lightened5',
    gradient: [
      '--polaris-negative-lightened5',
      '--polaris-negative-lightened5',
    ],
    border: '--polaris-negative-lightened4',
  },
};

const outlineComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-27',
    border: '--polaris-surface-opposingOpacified4',
  },
  hover: {
    background: '--polaris-surface-opposingOpacified05',
    border: '--polaris-surface-opposingOpacified4',
  },
  focus: {
    border: '--polaris-surface-opposingOpacified8',
    shadow: '--polaris-surface-opposingOpacified8',
  },
  active: {
    background: '--polaris-surface-opposingOpacified1',
  },
  disabled: {
    text: '--polaris-surface-20',
    icon: '--polaris-surface-20',
    border: '--polaris-surface-opposingOpacified3',
  },
};

const outlineDestructiveComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-negative-darkened4',
    border: '--polaris-negative-opacified4',
    icon: '--polaris-negative-darkened5',
  },
  hover: {
    background: '--polaris-negative-opacified05',
    border: '--polaris-negative-opacified4',
  },
  focus: {
    border: '--polaris-negative-opacified8',
    shadow: '--polaris-negative-opacified8',
  },
  active: {
    background: '--polaris-negative-opacified1',
  },
  disabled: {
    text: '--polaris-surface-20',
    icon: '--polaris-surface-20',
    border: '--polaris-negative-opacified3',
  },
};

const plainComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-interactive',
    icon: '--polaris-interactive',
  },
  hover: {
    text: '--polaris-interactive-darkened1',
    icon: '--polaris-interactive-darkened1',
  },
};

const plainDestructiveComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-negative',
    icon: '--polaris-negative',
  },
  hover: {
    text: '--polaris-negative-darkened5',
    icon: '--polaris-negative-darkened5',
  },
};

const theme = {
  base: reduceTheme(baseComponentTheme),
  primary: reduceTheme(primaryComponentTheme),
  destructive: reduceTheme(destructiveComponentTheme),
  outline: reduceTheme(outlineComponentTheme),
  outlineDestructive: reduceTheme(outlineDestructiveComponentTheme),
  plain: reduceTheme(plainComponentTheme),
  plainDestructive: reduceTheme(plainDestructiveComponentTheme),
};

export default theme;
