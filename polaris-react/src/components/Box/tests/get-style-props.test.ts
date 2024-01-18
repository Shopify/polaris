/* eslint @shopify/jest/no-snapshots : 0 */
import {convertStylePropsToCSSProperties} from '../get-style-props-2';
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
        "--_1md": "var(--_md) bg-fill-success",
        "backgroundColor": "var(--_1md,bg-fill-warning)",
      }
    `);
  });

  it('fallback to browser default behaviour (ie; `unset`) for responsive sizes smaller than those set on the style prop', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: {md: 'bg-fill-info'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--_1md": "var(--_md) bg-fill-info",
        "backgroundColor": "var(--_1md)",
      }
    `);
  });

  it('shorthand props are also responsive.', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      paddingInline: {md: '400', lg: '800'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "--_1": "var(--_1lg,var(--_1md))",
        "--_1lg": "var(--_lg) 800",
        "--_1md": "var(--_md) 400",
        "paddingInlineEnd": "var(--_1)",
        "paddingInlineStart": "var(--_1)",
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
        "--_1_hover": "var(--__hover) bg-fill-warning",
        "backgroundColor": "var(--_1_hover,bg-fill-info)",
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
        "--_1": "var(--_1_hovermd,var(--_1_hoversm,bg-fill-success))",
        "--_1_hovermd": "var(--_md_hover) bg-fill-critical",
        "--_1_hoversm": "var(--_sm_hover) bg-fill-warning",
        "backgroundColor": "var(--_1)",
      }
    `);
  });

  it.only('modifiers are ordered correctly', () => {
    const styleProps: ResponsiveStylePropsWithModifiers = {
      backgroundColor: 'bg-fill-info',
      _hover: {backgroundColor: 'bg-fill-warning'},
      _visited: {backgroundColor: 'bg-fill-critical'},
    };
    expect(convertStylePropsToCSSProperties(styleProps)).toMatchInlineSnapshot(`
      Object {
        "style": Object {
          "backgroundColor": "var(--__visited-on, bg-fill-critical) var(--__visited-off, var(--__hover-on, bg-fill-warning) var(--__hover-off, bg-fill-info))",
        },
      }
    `);
  });

  describe('default', () => {
    describe('static value', () => {
      it('is inherited from generated .css file when styleProp not set', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {};
        const defaults: PropDefaults = {
          borderInlineStartStyle: 'solid',
        };
        expect(
          convertStylePropsToCSSProperties(styleProps, defaults),
        ).toMatchInlineSnapshot(`Object {}`);
      });

      it('is set when responsive style props are passed that are not xs', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          borderInlineStartStyle: {md: 'dashed'},
        };
        const defaults: PropDefaults = {
          borderInlineStartStyle: 'solid',
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "--_1md": "var(--_md) dashed",
              "borderInlineStartStyle": "var(--_1md,solid)",
            }
          `);
      });

      it('is overridden by "xs" value in a responsive style prop', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          borderInlineStartStyle: {xs: 'dashed'},
        };
        const defaults: PropDefaults = {
          borderInlineStartStyle: 'solid',
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "borderInlineStartStyle": "dashed",
            }
          `);
      });

      it('does not interfere with non-default style props', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {display: 'flex'};
        const defaults: PropDefaults = {
          borderInlineStartStyle: 'solid',
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "display": "flex",
            }
          `);
      });
    });

    describe('dynamic/function value', () => {
      it("applies function values even when styleprop isn't passed", () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {display: 'flex'};
        const mockGetDefault = jest.fn(() => 'solid');
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
      });

      it('is overridden by a static style prop value', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          borderInlineStartStyle: 'dashed',
        };
        const mockGetDefault = jest.fn(() => 'solid');
        const defaults: PropDefaults = {
          borderInlineStartStyle:
            mockGetDefault as PropDefaults['borderInlineStartStyle'],
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "borderInlineStartStyle": "dashed",
            }
          `);
      });

      it('is overridden by "xs" value in a responsive style prop', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          borderInlineStartStyle: {xs: 'dashed'},
        };
        const mockGetDefault = jest.fn(() => 'solid');
        const defaults: PropDefaults = {
          borderInlineStartStyle:
            mockGetDefault as PropDefaults['borderInlineStartStyle'],
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "borderInlineStartStyle": "dashed",
            }
          `);
      });

      it('is set when responsive style props are passed that are not xs', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          borderInlineStartStyle: {md: 'dashed'},
        };
        const mockGetDefault = jest.fn(() => 'solid');
        const defaults: PropDefaults = {
          borderInlineStartStyle:
            mockGetDefault as PropDefaults['borderInlineStartStyle'],
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "--_1md": "var(--_md) dashed",
              "borderInlineStartStyle": "var(--_1md,solid)",
            }
          `);
      });

      it('ignores undefined values', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {};
        const mockGetDefault = jest.fn(() => undefined);
        const defaults: PropDefaults = {
          borderInlineStartStyle:
            mockGetDefault as PropDefaults['borderInlineStartStyle'],
        };
        expect(
          convertStylePropsToCSSProperties(styleProps, defaults),
        ).toMatchInlineSnapshot(`Object {}`);
      });

      it('is called with longhand style props', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          display: 'flex',
          paddingInline: '200',
        };
        const mockGetDefault = jest.fn(() => 'solid');
        const defaults: PropDefaults = {
          borderInlineStartStyle:
            mockGetDefault as PropDefaults['borderInlineStartStyle'],
        };
        convertStylePropsToCSSProperties(styleProps, defaults);

        expect(mockGetDefault.mock.calls).toHaveLength(1);
        // @ts-expect-error The array index DOES exist given the above expect()
        // call
        expect(mockGetDefault.mock.calls[0][0]).toMatchObject({
          display: {
            xs: 'flex',
          },
          paddingInlineEnd: {
            xs: '200',
          },
          paddingInlineStart: {
            xs: '200',
          },
        });
      });
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
