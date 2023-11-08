import style from './style.module.scss';
import {forwardRef} from 'react';
import decamelize from 'decamelize';
import {designTokenStyleProps} from '@shopify/polaris-tokens';
import type {CubeProps} from './types';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import {getResponsiveValue, isObject} from '../../utils/various';

function getCssProps(styleProps: Record<string, any>) {
  // camelCase to kebabCase of styleProps
  // intiailise responsive values from valid styleProps
  return Object.entries(styleProps).reduce((acc, [key, value]) => {
    const decamelizedPropKey = decamelize(key, {separator: '-'});
    let filteredValue = value;
    if (designTokenStyleProps.includes(key as any)) {
      filteredValue = `var(--p-${value})`;
      if (isObject(value)) {
        filteredValue = Object.entries(value).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: `var(--p-${value})`,
          };
        }, {});
      }
    }
    return {
      // TODO: Use `getResponsiveProps` for properties that must match to token
      // We need a way to differentiate properties that require token values from those that do not
      // values only.
      ...getResponsiveValue('box', decamelizedPropKey, filteredValue),
      ...acc,
    };
  }, {});
}

type PolymorphicCube = Polymorphic.ForwardRefComponent<any, Partial<CubeProps>>;

export const Cube = forwardRef(function Cube(
  {as: Tag = 'div', children, ...styleProps},
  forwardedRef,
) {
  const styles = {
    ...getCssProps(styleProps),
  };
  return (
    <Tag ref={forwardedRef} style={styles} className={style.Box}>
      {children}
    </Tag>
  );
}) as PolymorphicCube;
