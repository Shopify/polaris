import {
  colorInk,
  colorInkLighter,
  colorWhite,
  colorSkyLighter,
  colorIndigo,
  colorSkyLight,
  colorSkyDark,
} from '@shopify/polaris-tokens';
import styled from 'styled-components';
import {
  recolorIcon,
  controlHeight,
  border,
  borderRadius,
  shadow,
  duration,
  easing,
  spacing,
} from '../../utilities/style-utilities';

const minHeight = controlHeight;

export const Button = styled.button`
  ${recolorIcon(colorInkLighter)} position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${minHeight};
  min-width: ${minHeight};
  margin: 0;
  padding: ${spacing()} ${spacing('loose')};
  background: linear-gradient(to bottom, ${colorWhite}, ${colorSkyLighter});
  border: ${border('dark')};
  box-shadow: ${shadow('faint')};
  border-radius: ${borderRadius()};
  line-height: 1;
  color: ${colorInk};
  text-align: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition-property: background, border, box-shadow;
  transition-duration: ${duration()};
  transition-timing-function: ${easing()};

  &:hover {
    background: linear-gradient(
      to bottom,
      ${colorSkyLighter},
      ${colorSkyLight}
    );
    border-color: ${colorSkyDark};
  }

  &:focus {
    border-color: ${colorIndigo};
    outline: 0;
    box-shadow: 0 0 0 1px ${colorIndigo};
  }

  &:active {
    background: linear-gradient(to bottom, ${colorSkyLight}, ${colorSkyLight});
    border-color: ${colorSkyDark};
    box-shadow: 0 0 0 0 transparent,
      inset 0 1px 1px 0 rgba(${colorInkLighter}, 0.1),
      inset 0 1px 4px 0 rgba(${colorInkLighter}, 0.2);
  }
`;
