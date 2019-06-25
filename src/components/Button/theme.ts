import {CSSProperties} from 'react';

interface ComponentThemeProperties {
  [key: string]: {
    [key: string]: string;
  };
}

const baseComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-28',
    icon: '--polaris-surface-27',
    background: '--polaris-surface-0',
    backgroundSecondary: '--polaris-surface-1',
    border: '--polaris-surface-8',
  },
  hover: {
    backgroundPrimary: '--polaris-surface-1',
    backgroundSecondary: '--polaris-surface-2',
    border: '--polaris-surface-8',
  },
  focus: {
    border: '--polaris-brand',
    shadow: '--polaris-brand',
  },
  active: {
    backgroundPrimary: '--polaris-surface-1',
    backgroundSecondary: '--polaris-surface-1',
    border: '--polaris-surface-4',
    shadowPrimary: '--polaris-surface-opposingOpacified2',
    shadowSecondary: '--polaris-surface-opposingOpacified3',
  },
  disabled: {
    text: '--polaris-surface-20',
    icon: '--polaris-surface-20',
    backgroundPrimary: '--polaris-surface-1',
    backgroundSecondary: '--polaris-surface-1',
  },
};

const primaryComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-0',
    icon: '--polaris-surface-27',
    backgroundPrimary: '--polaris-brand-lightened1',
    backgroundSecondary: '--polaris-brand-darkened1',
    border: '--polaris-brand-darkened2',
    shadow: '--polaris-brand-lightened1',
  },
  hover: {
    backgroundPrimary: '--polaris-brand',
    backgroundSecondary: '--polaris-brand-darkened1',
    border: '--polaris-brand-darkened2',
    text: '--polaris-surface-0',
  },
  focus: {
    border: '--polaris-brand-darkened5',
    shadowPrimary: '--polaris-brand-lightened1',
    shadowSecondary: '--polaris-brand-darkened5',
  },
  active: {
    backgroundPrimary: '--polaris-brand-darkened2',
    backgroundSecondary: '--polaris-brand-darkened2',
    border: '--polaris-brand-darkened3',
    shadow: '--polaris-brand-darkened3',
  },
  disabled: {
    text: '--polaris-surface-0',
    icon: '--polaris-surface-0',
    backgroundPrimary: '--polaris-brand-lightened5',
    backgroundSecondary: '--polaris-brand-lightened5',
    border: '--polaris-brand-lightened4',
  },
};

const destructiveComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-0',
    icon: '--polaris-surface-27',
    backgroundPrimary: '--polaris-negative-lightened1',
    backgroundSecondary: '--polaris-negative-darkened1',
    border: '--polaris-negative-darkened2',
    shadow: '--polaris-negative-lightened1',
  },
  hover: {
    backgroundPrimary: '--polaris-negative',
    backgroundSecondary: '--polaris-negative-darkened1',
    border: '--polaris-negative-darkened2',
    text: '--polaris-surface-0',
  },
  focus: {
    border: '--polaris-negative-darkened5',
    shadowPrimary: '--polaris-negative-lightened1',
    shadowSecondary: '--polaris-negative-darkened5',
  },
  active: {
    backgroundPrimary: '--polaris-negative-darkened2',
    backgroundSecondary: '--polaris-negative-darkened2',
    border: '--polaris-negative-darkened3',
    shadow: '--polaris-negative-darkened3',
  },
  disabled: {
    text: '--polaris-surface-0',
    icon: '--polaris-surface-0',
    backgroundPrimary: '--polaris-negative-lightened5',
    backgroundSecondary: '--polaris-negative-lightened5',
    border: '--polaris-negative-lightened4',
  },
};

const outlineComponentTheme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-27',
    border: '--polaris-surface-opposingOpacified4',
  },
  hover: {
    backgroundPrimary: '--polaris-surface-opposingOpacified05',
    border: '--polaris-surface-opposingOpacified4',
  },
  focus: {
    border: '--polaris-surface-opposingOpacified8',
    shadowPrimary: '--polaris-surface-opposingOpacified8',
  },
  active: {
    backgroundPrimary: '--polaris-surface-opposingOpacified1',
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
    backgroundPrimary: '--polaris-negative-opacified05',
    border: '--polaris-negative-opacified4',
  },
  focus: {
    border: '--polaris-negative-opacified8',
    shadowPrimary: '--polaris-negative-opacified8',
  },
  active: {
    backgroundPrimary: '--polaris-negative-opacified1',
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

function reduceTheme(theme: ComponentThemeProperties): CSSProperties {
  return Object.entries(theme)
    .reduce((childAccumulator, childCurrent) => {
      return [
        ...childAccumulator,
        ...Object.entries(childCurrent[1]).reduce(
          (propertyAccumulator, propertyCurrent) => {
            return [
              ...propertyAccumulator,
              ...[
                {
                  [`--${childCurrent[0]}-${propertyCurrent[0]}`]: `var(${
                    propertyCurrent[1]
                  })`,
                },
              ],
            ];
          },
          [],
        ),
      ];
    }, [])
    .reduce((accumulator, current) => {
      return {...accumulator, ...current};
    }, {});
}

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
