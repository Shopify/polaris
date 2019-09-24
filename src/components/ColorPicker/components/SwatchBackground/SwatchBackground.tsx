import React from 'react';

import {HSBColor} from '../../../../utilities/color-types';
import {hsbToString} from '../../../../utilities/color-transformers';
import styles from '../../ColorPicker.scss';

export interface SwatchBackgroundProps {
  color: HSBColor;
}

export function SwatchBackground(props: SwatchBackgroundProps) {
  const {color} = props;

  const style = {backgroundColor: hsbToString(color)};
  return <div style={style} className={styles.SwatchBackground} />;
}
