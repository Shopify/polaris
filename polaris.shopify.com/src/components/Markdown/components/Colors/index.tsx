import * as colorsObj from '../../../../../../polaris-tokens/dist/esm/src/colors.mjs';
import {capitalize} from '../../../../utils/various';
import styles from './Colors.module.scss';

type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type ColorValue = {
  [index in ColorScale]: string;
};

interface Colors {
  [key: string]: ColorValue;
}

const colors = colorsObj as unknown as Colors;

export function Colors() {
  const colorOrder = [
    'gray',
    'green',
    'teal',
    'blue',
    'purple',
    'red',
    'orange',
    'yellow',
  ];

  const colorMap = colorOrder.map((color) => {
    const shades: ColorValue = colors[color] ?? [];
    const swatches = Object.entries(shades)
      .sort(([prevShade], [nextShade]) =>
        Number(prevShade) < Number(nextShade) ? 1 : -1,
      )
      .map(([shade, value]) => (
        <div key={value}>
          <div
            className={styles.ColorsSwatch}
            style={{backgroundColor: value}}
          ></div>
          <div>{shade}</div>
        </div>
      ));

    return (
      <>
        <h3>{capitalize(color)}</h3>
        <div className={styles.Colors}>{swatches}</div>
      </>
    );
  });

  return <>{colorMap}</>;
}
