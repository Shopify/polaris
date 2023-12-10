import {useEffect, useState} from 'react';
import {Grid} from '@shopify/polaris';
import {capitalize} from '../../../../utils/various';
import {Card} from '../../../Card';
import styles from './Colors.module.scss';

import colors from '../../../../../.cache/colors';

const COLOR_ORDER = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'cyan',
  'teal',
  'azure',
  'blue',
  'purple',
  'magenta',
  'rose',
] as const;

export function Colors() {
  const [selectOne, setSelectOne] = useState(true);
  const [a11yRatio, setA11yRatio] = useState<number | undefined>(undefined);
  const [colorOne, setColorOne] = useState({
    r: '',
    g: '',
    b: '',
    a: '',
    id: '',
  });
  const [colorTwo, setColorTwo] = useState({
    r: '',
    g: '',
    b: '',
    a: '',
    id: '',
  });

  useEffect(() => {
    if (!colorOne.id || !colorTwo.id) return;
    setA11yRatio(1 / a11yColorRatio(colorOne, colorTwo));
  }, [colorOne, colorTwo]);

  const selectColor = (colorValue: string, colorName: string) => {
    const rgbaArray = colorValue.replace(/[^\d,]+/g, '').split(',');

    if (selectOne === true) {
      setColorOne({
        r: rgbaArray[0],
        g: rgbaArray[1],
        b: rgbaArray[2],
        a: rgbaArray[3],
        id: colorName,
      });
    } else {
      setColorTwo({
        r: rgbaArray[0],
        g: rgbaArray[1],
        b: rgbaArray[2],
        a: rgbaArray[3],
        id: colorName,
      });
    }

    setSelectOne((selectOne) => !selectOne);
  };

  const colorMap = COLOR_ORDER.map((color) => {
    const shades = colors[color];
    let swatches: React.JSX.Element[] | null;
    if (shades) {
      swatches = Object.entries(shades).map(([shade, value]) => (
        <div
          key={value}
          className={[
            styles.ColorsSwatch,
            colorOne.id === color + shade || colorTwo.id === color + shade
              ? styles.ColorsSelected
              : undefined,
          ].join(' ')}
          style={{backgroundColor: value}}
          onClick={() => selectColor(value, color + shade)}
        />
      ));
    } else {
      swatches = null;
    }

    return (
      <div key={color} className={styles.Colors}>
        {swatches}
      </div>
    );
  });

  return (
    <>
      <div className={styles.ColorsContainer}>{colorMap}</div>
      <div className={styles.ColorsContrastContainer}>
        <Card>
          <Grid>
            <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 3, lg: 4, xl: 4}}>
              <h3>Colors</h3>
              <div className={styles.ColorBox}>
                <div
                  style={{
                    background: `rgb(${colorOne.r} ${colorOne.g} ${colorOne.b})`,
                  }}
                />
                <span>
                  {colorOne.id
                    ? capitalize(colorOne.id.split(/(\d+)/).join(' '))
                    : 'Pick two colors'}
                </span>
              </div>
              <div className={styles.ColorBox}>
                <div
                  style={{
                    background: `rgb(${colorTwo.r} ${colorTwo.g} ${colorTwo.b})`,
                  }}
                />
                <span>
                  {colorTwo.id
                    ? capitalize(colorTwo.id.split(/(\d+)/).join(' '))
                    : 'Pick two colors'}
                </span>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 3, lg: 8, xl: 8}}>
              <h3>Contrast ratio</h3>
              {a11yRatio ? a11yRatio.toFixed(2).toString() : '—'}
              <br />
              <div
                className={[
                  styles.ColorsWCAG,
                  a11yRatio
                    ? a11yRatio > 4.49
                      ? styles.ColorsWCAGPass
                      : styles.ColorsWCAGFail
                    : undefined,
                ].join(' ')}
              >
                AA Text
              </div>
              <br />
              <div
                className={[
                  styles.ColorsWCAG,
                  a11yRatio
                    ? a11yRatio > 2.99
                      ? styles.ColorsWCAGPass
                      : styles.ColorsWCAGFail
                    : undefined,
                ].join(' ')}
              >
                AA Interactive
              </div>
            </Grid.Cell>
          </Grid>
        </Card>
      </div>
    </>
  );
}

function a11yLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function a11yColorRatio(colorOne: any, colorTwo: any) {
  const colorOneL = a11yLuminance(colorOne.r, colorOne.g, colorOne.b);
  const colorTwoL = a11yLuminance(colorTwo.r, colorTwo.g, colorTwo.b);

  const ratio =
    colorOneL > colorTwoL
      ? (colorTwoL + 0.05) / (colorOneL + 0.05)
      : (colorOneL + 0.05) / (colorTwoL + 0.05);

  return ratio;
}
