import style from './style.module.scss';
import {PropsWithChildren} from 'react';
import decamelize from 'decamelize';
import * as CSS from 'csstype';
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

export function Cube({
  children,
  ...styleProps
}: PropsWithChildren<CSS.Properties & {as?: Element}>) {
  const styles = {
    ...getCssProps(styleProps),
  };
  return (
    <div style={styles} className={style.Box}>
      {children}
    </div>
  );
}
