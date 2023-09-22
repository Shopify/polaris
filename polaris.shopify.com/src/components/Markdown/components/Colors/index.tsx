import {Grid} from '@shopify/polaris';
import * as colorsObj from '../../../../../../polaris-tokens/dist/esm/src/colors-experimental.mjs';
import {capitalize} from '../../../../utils/various';
import {Card} from '../../../Card';
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
  ];

  let a11ySelectColorOne: boolean = false;
  let a11yColorOne: object = {id: 'none'};
  let a11yColorTwo: object = {id: 'none'};
  let a11yRatio: number = 0;
  const selectColor = (colorValue: string, colorName: string) => {
    a11ySelectColorOne = !a11ySelectColorOne;
    let rgbaArray = colorValue.replace(/[^\d,]+/g, '').split(',');

    document.querySelectorAll('.' + styles.ColorsSwatch).forEach((element) => {
      element.classList.remove(styles.ColorsSelected);
    });

    if (a11ySelectColorOne) {
      a11yColorOne = {
        r: rgbaArray[0],
        g: rgbaArray[1],
        b: rgbaArray[2],
        a: rgbaArray[3],
        id: colorName,
      };

      document.querySelector(
        '#contrast-ratio-color-one-box',
      ).style.backgroundColor = colorValue;
    } else {
      a11yColorTwo = {
        r: rgbaArray[0],
        g: rgbaArray[1],
        b: rgbaArray[2],
        a: rgbaArray[3],
        id: colorName,
      };

      document.querySelector(
        '#contrast-ratio-color-two-box',
      ).style.backgroundColor = colorValue;
    }
    console.log(a11yColorOne);
    console.log(colorName);

    document
      .querySelector('#' + a11yColorOne.id)
      ?.classList.add(styles.ColorsSelected);

    document
      .querySelector('#' + a11yColorTwo.id)
      ?.classList.add(styles.ColorsSelected);

    if (!Number.isNaN(1 / a11yColorRatio(a11yColorOne, a11yColorTwo))) {
      a11yRatio = 1 / a11yColorRatio(a11yColorOne, a11yColorTwo);
      document.getElementById('contrast-ratio').innerHTML = a11yRatio
        .toFixed(2)
        .toString();

      let crInteractive = document.querySelector('#contrast-ratio-interactive');
      let crText = document.querySelector('#contrast-ratio-text');

      crInteractive.classList.remove(styles.ColorsWCAGPass);
      crInteractive.classList.remove(styles.ColorsWCAGFail);
      crText.classList.remove(styles.ColorsWCAGPass);
      crText.classList.remove(styles.ColorsWCAGFail);

      a11yRatio > 2.99
        ? crInteractive.classList.add(styles.ColorsWCAGPass)
        : crInteractive.classList.add(styles.ColorsWCAGFail);
      a11yRatio > 4.49
        ? crText.classList.add(styles.ColorsWCAGPass)
        : crText.classList.add(styles.ColorsWCAGFail);

      document.getElementById('contrast-ratio-color-one').innerHTML =
        capitalize(a11yColorOne.id.split(/(\d+)/).join(' '));
      document.getElementById('contrast-ratio-color-two').innerHTML =
        capitalize(a11yColorTwo.id.split(/(\d+)/).join(' '));
    }
  };

  const a11yLuminance = (r: number, g: number, b: number) => {
    var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const a11yColorRatio = (colorOne: any, colorTwo: any) => {
    const colorOneL = a11yLuminance(colorOne.r, colorOne.g, colorOne.b);
    const colorTwoL = a11yLuminance(colorTwo.r, colorTwo.g, colorTwo.b);

    const ratio =
      colorOneL > colorTwoL
        ? (colorTwoL + 0.05) / (colorOneL + 0.05)
        : (colorOneL + 0.05) / (colorTwoL + 0.05);

    return ratio;
  };

  const colorMap = colorOrder.map((color) => {
    const shades: ColorValue = colors[color] ?? [];
    const swatches = Object.entries(shades).map(([shade, value]) => (
      <div key={value}>
        <div
          id={color + shade}
          className={styles.ColorsSwatch}
          style={{backgroundColor: value}}
          onClick={() => selectColor(value, color + shade)}
        ></div>
      </div>
    ));

    return (
      <>
        <div className={styles.Colors}>{swatches}</div>
      </>
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
                <div id="contrast-ratio-color-one-box"></div>
                <span id="contrast-ratio-color-one">Pick two colors</span>
              </div>
              <div className={styles.ColorBox}>
                <div id="contrast-ratio-color-two-box"></div>
                <span id="contrast-ratio-color-two">Pick two colors</span>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 3, lg: 8, xl: 8}}>
              <h3>Contrast ratio</h3>
              <span id="contrast-ratio">—</span>
              <br />
              <div id="contrast-ratio-text" className={styles.ColorsWCAG}>
                AA Text
              </div>
              <br />
              <div
                id="contrast-ratio-interactive"
                className={styles.ColorsWCAG}
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
