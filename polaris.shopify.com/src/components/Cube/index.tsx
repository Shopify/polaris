import style from './style.module.scss';
import {PropsWithChildren} from 'react';
import * as CSS from 'csstype';

function getCssProps(styleProps: Record<string, any>) {
  // camelCase to kebabCase of styleProps
  // intiailise responsive values from valid styleProps
  return {};
}

export function Box({
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
