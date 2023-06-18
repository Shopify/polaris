import {createElement} from 'react';
import {
  ComponentMap,
  Layer,
  PropDefinition,
  PropPath,
  PropType,
  PropValue,
  State,
} from './types';
import {
  createReactProps,
  getChildLayers,
  getIndexFromPath,
  getPropDefinition,
  getPropsThatCanHaveChildren,
  getPropValue,
  getPropValueSiblings,
  validatePropPath,
} from './utils';

const mockComponents: ComponentMap = {
  MyComponent: {
    description: 'Contains all prop types',
    reactComponent: function MyComponent() {
      return createElement('div', {}, 'Hello from MyComponent');
    },
    props: {
      singleString: {
        type: PropType.String,
        defaultValue: {
          type: PropType.String,
          value: 'default (required)',
        },
        description: 'A string (required)',
        isArrayed: false,
        isRequired: true,
      },
      arrayedString: {
        type: PropType.String,
        defaultValue: {
          type: PropType.String,
          value: 'default-1',
        },
        description: 'Many labels',
        isArrayed: true,
        isRequired: false,
      },
      singleBoolean: {
        type: PropType.Boolean,
        defaultValue: {
          type: PropType.Boolean,
          value: false,
        },
        description: 'If it is enabled',
        isArrayed: false,
        isRequired: false,
      },
      arrayedBoolean: {
        type: PropType.Boolean,
        defaultValue: {
          type: PropType.Boolean,
          value: false,
        },
        description: 'If the items are enabled',
        isArrayed: true,
        isRequired: false,
      },
      singleEnum: {
        type: PropType.Enum,
        defaultValue: {
          type: PropType.Enum,
          value: 'default',
        },
        options: ['default', 'something', 'else'],
        description: 'Options to choose from',
        isArrayed: false,
        isRequired: false,
      },
      arrayedEnum: {
        type: PropType.Enum,
        defaultValue: {
          type: PropType.Enum,
          value: 'default',
        },
        options: ['default-1', 'default-2', 'something', 'else'],
        description: 'Arrayed options to choose from',
        isArrayed: true,
        isRequired: false,
      },
      singleNumber: {
        type: PropType.Number,
        defaultValue: {
          type: PropType.Number,
          value: 42,
        },
        description: 'A number',
        isArrayed: false,
        isRequired: false,
      },
      arrayedNumber: {
        type: PropType.Number,
        defaultValue: {
          type: PropType.Number,
          value: 42,
        },
        description: 'Many numbers',
        isArrayed: true,
        isRequired: false,
      },
      singleReactNode: {
        type: PropType.ReactNode,
        defaultValue: {
          type: PropType.ReactNode,
          value: [],
        },
        description: 'A child',
        isArrayed: false,
        isRequired: false,
      },
      arrayedReactNode: {
        type: PropType.ReactNode,
        defaultValue: {
          type: PropType.ReactNode,
          value: [],
        },
        description: 'Many children',
        isArrayed: true,
        isRequired: false,
      },
      singleAction: {
        type: PropType.Action,
        defaultValue: {
          type: PropType.Action,
          value: [],
        },
        description: 'An action',
        isArrayed: false,
        isRequired: false,
      },
      arrayedAction: {
        type: PropType.Action,
        defaultValue: {
          type: PropType.Action,
          value: [],
        },
        description: 'Many actions',
        isArrayed: true,
        isRequired: false,
      },
      groupedItems: {
        type: PropType.Group,
        defaultValue: {
          type: PropType.Group,
          path: '',
          children: [],
        },
        description: 'A group',
        isArrayed: false,
        isRequired: false,
        children: {
          anotherString: {
            type: PropType.String,
            defaultValue: {
              type: PropType.String,
              value: 'default (required)',
            },
            description: 'A nested string (required)',
            isArrayed: false,
            isRequired: true,
          },
          anotherBoolean: {
            type: PropType.Boolean,
            defaultValue: {
              type: PropType.Boolean,
              value: false,
            },
            description: 'A nested boolean',
            isArrayed: false,
            isRequired: false,
          },
          anotherEnum: {
            type: PropType.Enum,
            defaultValue: {
              type: PropType.Enum,
              value: 'default',
            },
            options: ['default', 'something', 'else'],
            description: 'Options to choose from',
            isArrayed: false,
            isRequired: false,
          },
          anotherNumber: {
            type: PropType.Number,
            defaultValue: {
              type: PropType.Number,
              value: 42,
            },
            description: 'A number',
            isArrayed: false,
            isRequired: false,
          },
          anotherReactNode: {
            type: PropType.ReactNode,
            defaultValue: {
              type: PropType.ReactNode,
              value: [],
            },
            description: 'A child',
            isArrayed: false,
            isRequired: false,
          },
          anotherAction: {
            type: PropType.Action,
            defaultValue: {
              type: PropType.Action,
              value: [],
            },
            description: 'An action',
            isArrayed: false,
            isRequired: false,
          },
        },
      },
    },
  },
};

describe('getPropDefinition', () => {
  it('retrieves a prop definition from the first level', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const propPath: PropPath = [{key: 'singleString', index: 0}];
    const propDefinition = getPropDefinition(mockComponents, layer, propPath);
    const expected: PropDefinition =
      mockComponents['MyComponent'].props.singleString;
    expect(propDefinition).toEqual(expected);
  });

  it('retrieves a prop definition from the second level', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const propPath: PropPath = [
      {key: 'groupedItems', index: 0},
      {key: 'anotherString', index: 0},
    ];
    const propDefinition = getPropDefinition(mockComponents, layer, propPath);
    const expected: PropDefinition = {
      type: PropType.String,
      defaultValue: {
        type: PropType.String,
        value: 'default (required)',
      },
      description: 'A nested string (required)',
      isArrayed: false,
      isRequired: true,
    };
    expect(propDefinition).toEqual(expected);
  });
});

describe('validatePropPath', () => {
  it('checks that segment only contains alphabetic characters', () => {
    const propPath: PropPath = [
      {key: 'fine', index: 0},
      {key: 'n0pe', index: 0},
      {key: 'fine', index: 0},
    ];
    expect(() =>
      validatePropPath({propPath}),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Every segment must be alphabetic. If it has an index, it bust be a positive integer. The segment "n0pe" breaks this rule. Full path: "[{"key":"fine","index":0},{"key":"n0pe","index":0},{"key":"fine","index":0}]""`,
    );
  });

  it('does not allow negative indices', () => {
    const propPath: PropPath = [
      {key: 'fine', index: 0},
      {key: 'fail', index: -1},
    ];
    expect(() =>
      validatePropPath({propPath}),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Every segment key must be a non-negative integer. "fail[-1]" breaks this rule. Full path: "[{"key":"fine","index":0},{"key":"fail","index":-1}]""`,
    );
  });
});

describe('getPropValue', () => {
  it('retrieves a single prop value from the first level', () => {
    const propPath: PropPath = [{key: 'primary', index: 0}];
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          path: propPath,
          type: PropType.Boolean,
          value: false,
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const propValue = getPropValue(layer, propPath);
    const expected: PropValue[] = [
      {
        type: PropType.Boolean,
        path: propPath,
        value: false,
      },
    ];
    expect(propValue).toEqual(expected);
  });

  it('retrieves a single prop value from nested levels', () => {
    const propPath: PropPath = [
      {key: 'first', index: 0},
      {key: 'second', index: 0},
    ];
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          path: propPath,
          type: PropType.String,
          value: 'It works!',
        },
        {
          path: [
            {key: 'first', index: 0},
            {key: 'second', index: 1},
          ],
          type: PropType.String,
          value: 'Untouched',
        },
        {
          path: [{key: 'unrelated', index: 0}],
          type: PropType.String,
          value: 'Untouched',
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const propValue = getPropValue(layer, propPath);
    const expected: PropValue[] = [
      {
        type: PropType.String,
        path: propPath,
        value: 'It works!',
      },
    ];
    expect(propValue).toEqual(expected);
  });

  it('retrieves a single prop value from nested levels with an index in the middle of the path', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          path: [
            {key: 'first', index: 0},
            {key: 'second', index: 0},
          ],
          type: PropType.String,
          value: 'Untouched',
        },
        {
          path: [
            {key: 'first', index: 1},
            {key: 'second', index: 0},
          ],
          type: PropType.String,
          value: 'Found',
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const propPath: PropPath = [
      {key: 'first', index: 1},
      {key: 'second', index: 0},
    ];

    const propValue = getPropValue(layer, propPath);
    const expected: PropValue[] = [
      {
        type: PropType.String,
        path: propPath,
        value: 'Found',
      },
    ];
    expect(propValue).toEqual(expected);
  });

  it('retrieves a single prop value from nested levels with an index at the end of the path', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          path: [
            {key: 'first', index: 0},
            {key: 'second', index: 0},
          ],
          type: PropType.String,
          value: 'This works',
        },
        {
          path: [
            {key: 'first', index: 0},
            {key: 'second', index: 1},
          ],
          type: PropType.String,
          value: 'And this',
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const propPath: PropPath = [
      {key: 'first', index: 0},
      {key: 'second', index: 1},
    ];

    const propValue = getPropValue(layer, propPath);
    const expected: PropValue[] = [
      {
        type: PropType.String,
        path: propPath,
        value: 'And this',
      },
    ];
    expect(propValue).toEqual(expected);
  });

  // it('retrieves multiple prop values via the parent', () => {
  //   const layer: Layer = {
  //     id: 'layer-1',
  //     title: 'My layer',
  //     component: 'MyComponent',
  //     props: [
  //       {
  //         path: [
  //           {key: 'first', index: 0},
  //           {key: 'second', index: 0},
  //         ],
  //         type: PropType.String,
  //         value: 'This works',
  //       },
  //       {
  //         path: [
  //           {key: 'first', index: 0},
  //           {key: 'second', index: 1},
  //         ],
  //         type: PropType.String,
  //         value: 'And this',
  //       },
  //       {
  //         path: [{key: 'other', index: 0}],
  //         type: PropType.String,
  //         value: 'Not this',
  //       },
  //     ],
  //     viewId: 'view-1',
  //     parent: null,
  //     repeat: 1,
  //   };
  //   const propPath: PropPath = [{key: 'first', index: 0}];
  //   const propValue = getPropValue(layer, propPath);
  //   const expected: PropValue[] = [layer.props[0], layer.props[1]];
  //   expect(propValue).toEqual(expected);
  // });
});

describe('getPropValueSiblings', () => {
  it('gets siblings for base level props', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          type: PropType.String,
          path: [{key: 'singleString', index: 0}],
          value: 'Untouched',
        },
        {
          type: PropType.String,
          path: [{key: 'sibling', index: 0}],
          value: 'Sibling',
        },
        {
          type: PropType.String,
          path: [{key: 'sibling', index: 0}],
          value: 'Sibling',
        },
        {
          type: PropType.String,
          path: [
            {key: 'groupedItems', index: 0},
            {key: 'anotherString', index: 0},
          ],
          value: 'Untouched',
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const siblings = getPropValueSiblings(layer, [{key: 'sibling', index: 1}]);
    expect(siblings).toMatchInlineSnapshot(`
      [
        {
          "path": [
            {
              "index": 0,
              "key": "sibling",
            },
          ],
          "type": "string",
          "value": "Sibling",
        },
        {
          "path": [
            {
              "index": 0,
              "key": "sibling",
            },
          ],
          "type": "string",
          "value": "Sibling",
        },
      ]
    `);
  });

  it('gets siblings for nested props', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          type: PropType.String,
          path: [{key: 'singleString', index: 0}],
          value: 'Untouched',
        },
        {
          type: PropType.String,
          path: [
            {key: 'some', index: 0},
            {key: 'sibling', index: 0},
          ],
          value: 'Sibling',
        },
        {
          type: PropType.String,
          path: [
            {key: 'some', index: 1},
            {key: 'sibling', index: 1},
          ],
          value: 'Untouched',
        },
        {
          type: PropType.String,
          path: [
            {key: 'some', index: 0},
            {key: 'sibling', index: 1},
          ],
          value: 'Sibling',
        },
        {
          type: PropType.String,
          path: [
            {key: 'another', index: 0},
            {key: 'sibling', index: 0},
          ],
          value: 'Untouched',
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const siblings = getPropValueSiblings(layer, [
      {key: 'some', index: 0},
      {key: 'sibling', index: 1},
    ]);
    expect(siblings).toMatchInlineSnapshot(`
      [
        {
          "path": [
            {
              "index": 0,
              "key": "some",
            },
            {
              "index": 0,
              "key": "sibling",
            },
          ],
          "type": "string",
          "value": "Sibling",
        },
        {
          "path": [
            {
              "index": 0,
              "key": "some",
            },
            {
              "index": 1,
              "key": "sibling",
            },
          ],
          "type": "string",
          "value": "Sibling",
        },
      ]
    `);
  });
});

describe('createReactProps', () => {
  it("converts a layer's prop values into props", () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          type: PropType.String,
          path: [{key: 'singleString', index: 0}],
          value: 'Custom string on parent component',
        },
        {
          type: PropType.Boolean,
          path: [
            {key: 'groupedItems', index: 0},
            {key: 'anotherBoolean', index: 0},
          ],
          value: false,
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };

    const secondLayer: Layer = {
      id: 'layer-2',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          type: PropType.String,
          path: [{key: 'singleString', index: 0}],
          value: 'Custom string on child component',
        },
      ],
      viewId: 'view-1',
      parent: {
        layerId: 'layer-1',
        propDefinitionKeys: ['groupedItems', 'anotherReactNode'],
      },
      repeat: 1,
    };
    const state: State = {
      hoveredLayerId: null,
      layerAdderVisibility: false,
      layers: [layer, secondLayer],
      selectedViewId: 'view-1',
      views: [],
      appState: {
        sheets: [],
      },
    };

    const dispatch = () => undefined;
    const propValue = createReactProps({
      components: mockComponents,
      state,
      dispatch,
      layer,
      propPath: [],
    });
    expect(propValue).toMatchInlineSnapshot(`
      {
        "groupedItems": {
          "anotherBoolean": false,
          "anotherReactNode": <MyComponent
            groupedItems={
              {
                "anotherString": "default (required)",
              }
            }
            singleString="Custom string on child component"
          />,
          "anotherString": "default (required)",
        },
        "singleString": "Custom string on parent component",
      }
    `);
  });

  it("handles ReactNodes that don't have a matching child layer", () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [
        {
          type: PropType.ReactNode,
          path: [
            {key: 'connectedDisclosure', index: 0},
            {key: 'actions', index: 0},
            {key: 'prefix', index: 0},
          ],
          value: [],
        },
      ],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };

    const state: State = {
      hoveredLayerId: null,
      layerAdderVisibility: false,
      layers: [layer],
      selectedViewId: 'view-1',
      views: [],
      appState: {
        sheets: [],
      },
    };

    const dispatch = () => undefined;
    const propValue = createReactProps({
      components: mockComponents,
      state,
      dispatch,
      layer,
      propPath: [],
    });
    expect(propValue).toMatchInlineSnapshot(`
      {
        "groupedItems": {
          "anotherString": "default (required)",
        },
        "singleString": "default (required)",
      }
    `);
  });
});

describe('getChildLayers', () => {
  it('retrieves child layers', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const childLayer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [],
      viewId: 'view-1',
      parent: {
        layerId: 'layer-1',
        propDefinitionKeys: ['groupedItems', 'anotherReactNode'],
      },
      repeat: 1,
    };
    const untouchedLayer: Layer = {
      id: 'layer-3',
      title: 'My layer',
      component: 'MyComponent',
      props: [],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };

    const state: State = {
      hoveredLayerId: null,
      layerAdderVisibility: false,
      layers: [layer, childLayer, untouchedLayer],
      selectedViewId: 'view-1',
      views: [],
      appState: {
        sheets: [],
      },
    };
    if (!childLayer.parent) {
      throw new Error('Type guard: Could not find child layer');
    }
    expect(getChildLayers(state, layer, childLayer.parent.propDefinitionKeys))
      .toMatchInlineSnapshot(`
      [
        {
          "component": "MyComponent",
          "id": "layer-1",
          "parent": {
            "layerId": "layer-1",
            "propDefinitionKeys": [
              "groupedItems",
              "anotherReactNode",
            ],
          },
          "props": [],
          "repeat": 1,
          "title": "My layer",
          "viewId": "view-1",
        },
      ]
    `);
  });
});

describe('getPropsThatCanHaveChildren', () => {
  it('returns the correct children component', () => {
    const layer: Layer = {
      id: 'layer-1',
      title: 'My layer',
      component: 'MyComponent',
      props: [],
      viewId: 'view-1',
      parent: null,
      repeat: 1,
    };
    const props = getPropsThatCanHaveChildren(mockComponents, layer);
    expect(props).toMatchInlineSnapshot(`
      [
        [
          {
            "index": 0,
            "key": "singleReactNode",
          },
        ],
        [
          {
            "index": 0,
            "key": "arrayedReactNode",
          },
        ],
        [
          {
            "index": 0,
            "key": "groupedItems",
          },
          {
            "index": 0,
            "key": "anotherReactNode",
          },
        ],
      ]
    `);
  });
});

describe('getIndexFromPath', () => {
  it('retrieves the index from a non-parent path', () => {
    const path: PropPath = [{key: 'something', index: 42}];
    expect(getIndexFromPath(path)).toEqual(42);
  });
  it('removes an index from a parent path', () => {
    const path: PropPath = [
      {key: 'something', index: 42},
      {key: 'else', index: 99},
    ];
    expect(getIndexFromPath(path)).toEqual(99);
  });
});
