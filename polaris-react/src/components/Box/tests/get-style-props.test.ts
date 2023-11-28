/* eslint @shopify/jest/no-snapshots : 0 */
import {convertStylePropsToCSSProperties} from '../get-style-props';

describe('Modifiers are ordered correctly', () => {});

describe('If no style props are passed in, return an empty object', () => {});

describe('If initial or inherit are passed in as values to any property, throw an error', () => {});

describe('convertStylePropsToCSSProperties', () => {
  it('1. A simple style prop is applied directly to the css declaration.', () => {
    const StyleProps = {display: 'flex'};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('2. A tokenized style prop is converted to the requisite Polaris custom property.', () => {
    const StyleProps = {backgroundColor: 'bg-fill-info'};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('3. Defaults are applied (in this case; <code>border-style: solid</code>)', () => {
    const StyleProps = {borderColor: 'black'};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('4. Multiple style props are applied at the same time.', () => {
    const StyleProps = {borderColor: 'coral', color: 'text-emphasis'};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('5. Shorthand style props are expanded to their longhand CSS declarations.', () => {
    const StyleProps = {padding: '400'};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('6. Shorthand style props are overridden by more specific longhand props regardless of prop order.', () => {
    const StyleProps = {
      paddingInlineStart: '200',
      padding: '400',
      paddingBlockStart: '600',
      backgroundColor: 'bg-fill-info',
    };
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it("7. Responsive props are mobile first (ie; least specific style is 'xs' breakpoint).", () => {
    const StyleProps = {
      backgroundColor: {xs: 'bg-fill-warning', md: 'bg-fill-success'},
    };
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it("8. Responsive props fallback to 'unset' when width below smallest breakpoint specified.", () => {
    const StyleProps = {backgroundColor: {md: 'bg-fill-info'}};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('9. Shorthand props are also responsive.', () => {
    const StyleProps = {paddingInline: {md: '400', lg: '800'}};
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it('13. Modifiers are more specific than base style props. (hover me!)', () => {
    const StyleProps = {
      backgroundColor: 'bg-fill-info',
      _hover: {backgroundColor: 'bg-fill-warning'},
    };
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });

  it("13. Modifiers are also responsive (hover me above and below 'md' breakpoint).", () => {
    const StyleProps = {
      backgroundColor: 'bg-fill-success',
      _hover: {
        backgroundColor: {sm: 'bg-fill-warning', md: 'bg-fill-critical'},
      },
    };
    expect(convertStylePropsToCSSProperties(StyleProps)).toMatchSnapshot();
  });
});
