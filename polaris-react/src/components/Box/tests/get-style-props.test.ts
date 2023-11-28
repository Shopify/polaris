/* eslint @shopify/jest/no-snapshots : 0 */
import {convertStylePropsToCSSProperties} from '../get-style-props';
import type {
  ResponsiveStylePropsWithModifiers,
  PropDefaults,
} from '../generated-data';
import {disallowedCSSPropertyValues} from '../generated-data';

describe('convertStylePropsToCSSProperties', () => {
  it('if no style props are passed in, return an empty object', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {};
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(
      `Object {}`,
    );
  });

  it('a simple style prop is applied directly to the css declaration.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {display: 'flex'};
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "display": "flex",
      }
    `);
  });

  it('a tokenized style prop is converted to the requisite Polaris custom property.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: 'bg-fill-info',
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "backgroundColor": "bg-fill-info",
      }
    `);
  });

  it('multiple style props are applied at the same time.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      borderColor: 'border',
      color: 'text-emphasis',
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "borderBlockEndColor": "border",
        "borderBlockStartColor": "border",
        "borderInlineEndColor": "border",
        "borderInlineStartColor": "border",
        "color": "text-emphasis",
      }
    `);
  });

  it('shorthand style props are expanded to their longhand CSS declarations.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {padding: '400'};
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "paddingBlockEnd": "400",
        "paddingBlockStart": "400",
        "paddingInlineEnd": "400",
        "paddingInlineStart": "400",
      }
    `);
  });

  it('shorthand style props are overridden by more specific longhand props regardless of prop order.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      paddingInlineStart: '200',
      padding: '400',
      paddingBlockStart: '600',
      backgroundColor: 'bg-fill-info',
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "backgroundColor": "bg-fill-info",
        "paddingBlockEnd": "400",
        "paddingBlockStart": "600",
        "paddingInlineEnd": "400",
        "paddingInlineStart": "200",
      }
    `);
  });

  it("responsive props are mobile first (ie; least specific style is 'xs' breakpoint).", () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: {xs: 'bg-fill-warning', md: 'bg-fill-success'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--⅀1md": "var(--⅀md) bg-fill-success",
        "backgroundColor": "var(--⅀1md,bg-fill-warning)",
      }
    `);
  });

  it("responsive props fallback to 'unset' when width below smallest breakpoint specified.", () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: {md: 'bg-fill-info'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--⅀1md": "var(--⅀md) bg-fill-info",
        "backgroundColor": "var(--⅀1md)",
      }
    `);
  });

  it('shorthand props are also responsive.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      paddingInline: {md: '400', lg: '800'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--⅀1": "var(--⅀1lg,var(--⅀1md))",
        "--⅀1lg": "var(--⅀lg) 800",
        "--⅀1md": "var(--⅀md) 400",
        "paddingInlineEnd": "var(--⅀1)",
        "paddingInlineStart": "var(--⅀1)",
      }
    `);
  });

  it('modifiers are more specific than base style props.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: 'bg-fill-info',
      _hover: {backgroundColor: 'bg-fill-warning'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--⅀1_hover": "var(--⅀_hover) bg-fill-warning",
        "backgroundColor": "var(--⅀1_hover,bg-fill-info)",
      }
    `);
  });

  it('modifiers are responsive.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: 'bg-fill-success',
      _hover: {
        backgroundColor: {sm: 'bg-fill-warning', md: 'bg-fill-critical'},
      },
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--⅀1": "var(--⅀1_hovermd,var(--⅀1_hoversm,bg-fill-success))",
        "--⅀1_hovermd": "var(--⅀md_hover) bg-fill-critical",
        "--⅀1_hoversm": "var(--⅀sm_hover) bg-fill-warning",
        "backgroundColor": "var(--⅀1)",
      }
    `);
  });

  it('modifiers are ordered correctly', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: 'bg-fill-info',
      _hover: {backgroundColor: 'bg-fill-warning'},
      _visited: {backgroundColor: 'bg-fill-critical'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--⅀1": "var(--⅀1_hover,var(--⅀1_visited,bg-fill-info))",
        "--⅀1_hover": "var(--⅀_hover) bg-fill-warning",
        "--⅀1_visited": "var(--⅀_visited) bg-fill-critical",
        "backgroundColor": "var(--⅀1)",
      }
    `);
  });

  describe('defaults', () => {
    it('applies string values', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {display: 'flex'};
      const defaults: PropDefaults = {
        borderInlineStartStyle: 'solid',
      };
      expect(convertStylePropsToCSSProperties(styleProps, defaults))
        .toMatchInlineSnapshot(`
        Object {
          "borderInlineStartStyle": "solid",
          "display": "flex",
        }
      `);
    });

    it('applies function values', () => {
      const mockGetDefault = jest.fn(() => 'solid');
      const styleProps: ResponsiveStylePropsWithModifiers = {display: 'flex'};
      const defaults: PropDefaults = {
        borderInlineStartStyle:
          mockGetDefault as PropDefaults['borderInlineStartStyle'],
      };
      expect(convertStylePropsToCSSProperties(styleProps, defaults))
        .toMatchInlineSnapshot(`
        Object {
          "borderInlineStartStyle": "solid",
          "display": "flex",
        }
      `);

      expect(mockGetDefault.mock.calls).toHaveLength(1);
      // @ts-expect-error The array index DOES exist given the above expect()
      // call
      expect(mockGetDefault.mock.calls[0][0]).toMatchObject({
        display: 'flex',
      });
    });

    it('are applied even when no style props are passed', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {};
      const defaults: PropDefaults = {
        borderInlineStartStyle: 'solid',
      };
      expect(convertStylePropsToCSSProperties(styleProps, defaults))
        .toMatchInlineSnapshot(`
        Object {
          "borderInlineStartStyle": "solid",
        }
      `);
    });
  });

  describe('errors', () => {
    disallowedCSSPropertyValues.forEach((disallowedCSSValue) => {
      it(`a value of '${disallowedCSSValue}' throws an error`, () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          display: disallowedCSSValue,
        };
        const errorRegexp = new RegExp(
          `.*${disallowedCSSValue}.* are reserved values, but were passed into the .* prop. Please use a different value.`,
        );
        expect(() => convertStylePropsToCSSProperties(styleProps)).toThrow(
          errorRegexp,
        );
      });
    });
  });
});
