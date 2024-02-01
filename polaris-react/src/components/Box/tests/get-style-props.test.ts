/* eslint @shopify/jest/no-snapshots : 0 */
import get from 'lodash.get';

import {convertStylePropsToCSSProperties} from '../get-style-props-2';
import type {
  ResponsiveStylePropsWithModifiers,
  PropDefaults,
} from '../generated-data';
import {disallowedCSSPropertyValues} from '../generated-data';

type ConvertParams = Parameters<typeof convertStylePropsToCSSProperties>;

describe('convertStylePropsToCSSProperties', () => {
  describe.each([
    {outputPath: 'style', name: 'root'},
    {
      element: '_before',
      outputPath: '_before.style',
      name: '_before pseudo element',
    },
    {
      element: '_after',
      outputPath: '_after.style',
      name: '_after pseudo element',
    },
  ])('non-modifier styles for $name', ({element, outputPath}) => {
    const convert = (
      styleProps: ConvertParams[0],
      ...args: ConvertParams extends [any, ...infer Rest] ? Rest : never
    ): ReturnType<typeof convertStylePropsToCSSProperties>['style'] =>
      get(
        element
          ? convertStylePropsToCSSProperties({[element]: styleProps}, ...args)
          : convertStylePropsToCSSProperties(styleProps, ...args),
        outputPath,
      );

    it('a simple style prop is applied directly to the css declaration.', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {display: 'flex'};
      expect(convert(styleProps)).toMatchInlineSnapshot(`
        Object {
          "display": "flex",
        }
      `);
    });

    it('a tokenized style prop is converted to the requisite Polaris custom property.', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        backgroundColor: 'bg-fill-info',
        color: {sm: 'red', xl: 'blue'},
      };
      const mockMapper = jest.fn(() => 'initial');
      expect(
        convertStylePropsToCSSProperties(styleProps, undefined, mockMapper),
      ).toMatchInlineSnapshot(`
        Object {
          "style": Object {
            "backgroundColor": "initial",
            "color": "var(--_xl-on,initial) var(--_xl-off,var(--_sm-on,initial))",
          },
        }
      `);
      expect(mockMapper.mock.calls).toHaveLength(3);
      expect(mockMapper).toHaveBeenNthCalledWith(
        1,
        'bg-fill-info',
        'backgroundColor',
        ['backgroundColor', 'xs'],
      );
      expect(mockMapper).toHaveBeenNthCalledWith(2, 'red', 'color', [
        'color',
        'sm',
      ]);
      expect(mockMapper).toHaveBeenNthCalledWith(3, 'blue', 'color', [
        'color',
        'xl',
      ]);
    });

    it('multiple style props are applied at the same time.', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        borderInlineStartColor: 'border',
        color: 'text-emphasis',
      };
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {
              "borderInlineStartColor": "border",
              "color": "text-emphasis",
            },
          }
        `);
    });

    describe.skip('aliases/shorthands', () => {
      it('shorthand style props are expanded to their longhand CSS declarations.', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {padding: '400'};
        expect(convert(styleProps)).toMatchInlineSnapshot(`
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
        expect(convert(styleProps)).toMatchInlineSnapshot(`
            Object {
              "backgroundColor": "bg-fill-info",
              "paddingBlockEnd": "400",
              "paddingBlockStart": "600",
              "paddingInlineEnd": "400",
              "paddingInlineStart": "200",
            }
        `);
      });

      it('shorthand props are also responsive.', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          paddingInline: {md: '400', lg: '800'},
        };
        expect(convert(styleProps)).toMatchInlineSnapshot(`
          Object {
            "--_1": "var(--_lg-on,800) var(--_lg-off,var(--_md-on,400))",
            "paddingInlineEnd": "var(--_1)",
            "paddingInlineStart": "var(--_1)",
          }
        `);
      });
    });

    it("responsive props are mobile first (ie; least specific style is 'xs' breakpoint).", () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        backgroundColor: {xs: 'bg-fill-warning', md: 'bg-fill-success'},
      };
      expect(convert(styleProps)).toMatchInlineSnapshot(`
        Object {
          "backgroundColor": "var(--_md-on,bg-fill-success) var(--_md-off,bg-fill-warning)",
        }
      `);
    });

    it('fallback to browser default behaviour (ie; `unset`) for responsive sizes smaller than those set on the style prop', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        backgroundColor: {md: 'bg-fill-info'},
      };
      expect(convert(styleProps)).toMatchInlineSnapshot(`
        Object {
          "backgroundColor": "var(--_md-on,bg-fill-info)",
        }
      `);
    });

    describe('runtime defaults', () => {
      describe('static value', () => {
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
              "style": Object {
                "borderInlineStartStyle": "var(--_md-on,dashed) var(--_md-off,solid)",
              },
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
              "style": Object {
                "borderInlineStartStyle": "dashed",
              },
            }
          `);
        });

        it('is overridden by non-responsive value', () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            borderInlineStartStyle: 'dashed',
          };
          const defaults: PropDefaults = {
            borderInlineStartStyle: 'solid',
          };
          expect(convertStylePropsToCSSProperties(styleProps, defaults))
            .toMatchInlineSnapshot(`
            Object {
              "style": Object {
                "borderInlineStartStyle": "dashed",
              },
            }
          `);
        });

        it('merges runtime defaults even when missing from style props', () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            display: 'flex',
          };
          const runtimeDefaults: PropDefaults = {
            borderInlineStartStyle: 'solid',
          };
          expect(convertStylePropsToCSSProperties(styleProps, runtimeDefaults))
            .toMatchInlineSnapshot(`
              Object {
                "style": Object {
                  "borderInlineStartStyle": "solid",
                  "display": "flex",
                },
              }
            `);
        });
      });

      describe.skip('dynamic/function value', () => {
        it('is not called when matching non-responsive style prop is passed', () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            display: 'flex',
          };
          const mockGetDefault = jest.fn(() => 'block');
          const defaults: PropDefaults = {
            display: mockGetDefault as PropDefaults['display'],
          };
          convertStylePropsToCSSProperties(styleProps, defaults);

          expect(mockGetDefault.mock.calls).toHaveLength(0);
        });

        it('is not called when matching responsive `xs` style prop is passed', () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            display: {xs: 'flex'},
          };
          const mockGetDefault = jest.fn(() => 'block');
          const defaults: PropDefaults = {
            display: mockGetDefault as PropDefaults['display'],
          };
          convertStylePropsToCSSProperties(styleProps, defaults);

          expect(mockGetDefault.mock.calls).toHaveLength(0);
        });

        it('is called when no matching style prop is passed', () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            color: 'red',
          };
          const mockGetDefault = jest.fn(() => 'block');
          const defaults: PropDefaults = {
            display: mockGetDefault as PropDefaults['display'],
          };
          convertStylePropsToCSSProperties(styleProps, defaults);

          expect(mockGetDefault.mock.calls).toHaveLength(1);
          expect(mockGetDefault).toHaveBeenCalledWith({color: 'red'});
        });

        it('is called with resolved aliases', () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            paddingInline: '200',
          };
          const mockGetDefault = jest.fn(() => 'solid');
          const defaults: PropDefaults = {
            borderInlineStartStyle:
              mockGetDefault as PropDefaults['borderInlineStartStyle'],
          };
          convertStylePropsToCSSProperties(styleProps, defaults);

          expect(mockGetDefault.mock.calls).toHaveLength(1);
          expect(mockGetDefault).toHaveBeenCalledWith({
            paddingInlineStart: '200',
            paddingInlineEnd: '200',
          });
        });

        it("applies function values even when styleprop isn't passed", () => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            display: 'flex',
          };
          const mockGetDefault = jest.fn(() => 'solid');
          const defaults: PropDefaults = {
            borderInlineStartStyle:
              mockGetDefault as PropDefaults['borderInlineStartStyle'],
          };
          expect(convertStylePropsToCSSProperties(styleProps, defaults))
            .toMatchInlineSnapshot(`
            Object {
              "style": Object {
                "borderInlineStartStyle": "solid",
                "display": "flex",
              },
            }
          `);
        });

        it('is overridden by non-responsive value', () => {
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
              "style": Object {
                "borderInlineStartStyle": "dashed",
              },
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
              "style": Object {
                "borderInlineStartStyle": "dashed",
              },
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
              "style": Object {
                "borderInlineStartStyle": "var(--_md-on,dashed) var(--_md-off,solid)",
              },
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
          expect(convertStylePropsToCSSProperties(styleProps, defaults))
            .toMatchInlineSnapshot(`
            Object {
              "style": Object {},
            }
          `);
        });
      });
    });

    describe('errors', () => {
      it.each(disallowedCSSPropertyValues)(
        'a value of %s throws an error',
        (disallowedCSSValue) => {
          const styleProps: ResponsiveStylePropsWithModifiers = {
            display: disallowedCSSValue,
          };
          expect(() => convertStylePropsToCSSProperties(styleProps)).toThrow(
            `Invariant failed: [display.xs] ${disallowedCSSValue} is a disallowed value. Please use a different value.`,
          );
        },
      );
    });
  });

  describe('empty styles', () => {
    it('if no style props are passed in, return an empty object', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {};
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {},
          }
        `);
    });

    it('if no style props are passed in to pseudo element, return an empty object', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        _before: {},
        _after: {},
      };
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {},
          }
        `);
    });

    it.skip('global default is inherited from generated .css file when styleProp not set', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {};
      const defaults: PropDefaults = {
        borderInlineStartStyle: 'solid',
      };
      expect(convertStylePropsToCSSProperties(styleProps, defaults))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {},
          }
        `);
    });
  });

  describe.skip('de-duplication optimization', () => {
    it('duplicates are pushed into a custom property', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        paddingInlineStart: {md: '400', lg: '800'},
        paddingInlineEnd: {md: '400', lg: '800'},
      };
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
      Object {
        "style": Object {
          "--_1": "var(--_lg-on,800) var(--_lg-off,var(--_md-on,400))",
          "paddingInlineStart": "var(--_1)",
          "paddingInlineEnd": "var(--_1)",
        },
      }
    `);
    });

    it.todo(
      'deopt: custom property is not created for duplicated with initial/inherit/unset',
    );

    it.todo(
      'duplicates across root and pseudo element are deduped into custom property on root element',
    );
  });

  describe('modifiers', () => {
    it('are more specific than base style props regardless of object key order.', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        backgroundColor: 'bg-fill-info',
        _hover: {
          backgroundColor: 'bg-fill-warning',
          color: 'blue',
        },
        color: 'red',
      };
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {
              "backgroundColor": "var(--__hover-on,bg-fill-warning) var(--__hover-off,bg-fill-info)",
              "color": "var(--__hover-on,blue) var(--__hover-off,red)",
            },
          }
        `);
    });

    it('are responsive.', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        backgroundColor: 'bg-fill-success',
        _hover: {
          backgroundColor: {sm: 'bg-fill-warning', md: 'bg-fill-critical'},
        },
      };
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {
              "backgroundColor": "var(--__hover-on,var(--_md-on,bg-fill-critical) var(--_md-off,var(--_sm-on,bg-fill-warning))) var(--__hover-off,bg-fill-success)",
            },
          }
        `);
    });

    it('are ordered correctly', () => {
      const styleProps: ResponsiveStylePropsWithModifiers = {
        backgroundColor: 'bg-fill-info',
        _hover: {backgroundColor: 'bg-fill-warning'},
        _visited: {backgroundColor: 'bg-fill-critical'},
      };
      expect(convertStylePropsToCSSProperties(styleProps))
        .toMatchInlineSnapshot(`
          Object {
            "style": Object {
              "backgroundColor": "var(--__visited-on,bg-fill-critical) var(--__visited-off,var(--__hover-on,bg-fill-warning) var(--__hover-off,bg-fill-info))",
            },
          }
        `);
    });

    describe('runtime defaults', () => {
      it('are deep merged', () => {
        const styleProps: ResponsiveStylePropsWithModifiers = {
          _focus: {outlineWidth: {md: '3px'}},
        };

        const defaults: PropDefaults = {
          outlineWidth: 0,
          _focus: {
            outlineWidth: {xs: '1px', md: '2px'},
          },
        };
        expect(convertStylePropsToCSSProperties(styleProps, defaults))
          .toMatchInlineSnapshot(`
            Object {
              "style": Object {
                "outlineWidth": "var(--__focus-on,var(--_md-on,3px) var(--_md-off,1px)) var(--__focus-off,0)",
              },
            }
          `);
      });

      it.todo(
        'A value of `null` will remove a runtime default, but not apply another value',
      );
      it.todo(
        'A value of `null` will remove a global default, but not apply another value',
      );

      // default: {color: {md: 'red'}}
      // styleProp: {color: 'blue'}
      // result: {color: {xs: 'blue', md: 'red'}}
      it.todo(
        'A responsive runtime default is merged into a non-responsive style prop',
      );

      // default: {color: 'red'}
      // styleProp: {color: {md: 'blue'}}
      // result: {color: {xs: 'red', md: 'blue'}}
      it.todo(
        'A non-responsive runtime default is merged into a responsive style prop',
      );

      // default: {color: {md: 'red'}}
      // styleProp: {color: 'blue'}
      // result: {color: {xs: 'blue', md: 'red'}}
      it.todo(
        'A responsive global default is merged into a non-responsive style prop',
      );

      // default: {color: 'red'}
      // styleProp: {color: {md: 'blue'}}
      // result: {color: {xs: 'red', md: 'blue'}}
      it.todo(
        'A non-responsive global default is merged into a responsive style prop',
      );
    });
  });

  describe('root & pseudo elements interaction', () => {
    it.todo('modifiers within pseudos are ignored');

    it.todo('pseudos within modifiers apply the modifier to the pseudo');

    it.todo('pseudo styles dont overwrite root styles and vice versa');

    it.todo('dynamic default is called for root and any pseudo elements');

    it.todo('global defaults cannot be applied to pseudo elements');
  });
});
