import style from './style.module.scss';
import {forwardRef} from 'react';
import decamelize from 'decamelize';
import * as CSS from 'csstype';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import {getResponsiveProps} from '../../utils/various';

function getCssProps(styleProps: Record<string, any>) {
  // camelCase to kebabCase of styleProps
  // intiailise responsive values from valid styleProps
  return Object.entries(styleProps).reduce((acc, [key, value]) => {
    const decamelizedPropKey = decamelize(key, {separator: '-'});
    return {
      ...getResponsiveProps('box', decamelizedPropKey, null, value),
      ...acc,
    };
  }, {});
}

export interface CubeProps extends CSS.Properties {}

type PolymorphicCube = Polymorphic.ForwardRefComponent<any, CubeProps>;

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
