import * as colors from '../../../../../../polaris-tokens/dist/esm/src/colors.mjs';
import {capitalize} from '../../../../utils/various';
import './Colors.module.scss';

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
    const shades: string[] = colors[color] ?? [];
    const swatches = Object.entries(shades)
      .sort(([prevShade], [nextShade]) =>
        Number(prevShade) < Number(nextShade) ? 1 : -1,
      )
      .map(([shade, value]) => (
        <div key={value}>
          <div className="colors-swatch" style={{backgroundColor: value}}></div>
          <div>{shade}</div>
        </div>
      ));

    return (
      <>
        <h3>{capitalize(color)}</h3>
        <div className="colors">{swatches}</div>
      </>
    );
  });

  return colorMap;
}
