import {reducer} from './reducer';
import {Action, PropType, State} from './types';

const initialStateWithoutLayers: State = {
  hoveredLayerId: null,
  layers: [],
  views: [
    {
      id: 'view-1',
      name: 'Index',
      selectedLayerId: null,
      type: 'View',
    },
  ],
  selectedViewId: 'a',
  layerAdderVisibility: false,
  appState: {
    sheets: [],
  },
};

describe('reducer', () => {
  describe('SET_PROPS', () => {
    it('throws an error if the layer does not exist', () => {
      const dispatch = () =>
        reducer(initialStateWithoutLayers, {
          type: 'SET_PROP',
          layerId: 'layer-999',
          propValue: {
            path: [{key: 'title', index: 0}],
            type: PropType.String,
            value: 'Title',
          },
        });
      expect(dispatch).toThrowErrorMatchingInlineSnapshot(
        `"Could not set prop. Layer "layer-999" not found."`,
      );
    });

    it('throws an error if the index is out of bounds', () => {
      const state: State = {
        ...initialStateWithoutLayers,
        layers: [
          {
            id: 'layer-1',
            title: 'Button layer',
            component: 'Button',
            parent: null,
            repeat: 1,
            viewId: 'view-1',
            props: [
              {
                path: [{key: 'title', index: 0}],
                type: PropType.String,
                value: 'Title',
              },
            ],
          },
        ],
      };

      const action: Action = {
        type: 'SET_PROP',
        layerId: 'layer-1',
        propValue: {
          path: [{key: 'title', index: 2}],
          type: PropType.String,
          value: 'Updated title',
        },
      };
      const dispatch = () => reducer(state, action);
      expect(dispatch).toThrowErrorMatchingInlineSnapshot(
        `"Could not set prop. Index "2" is out of bounds."`,
      );
    });

    it('updates existing prop at index 0', () => {
      const state: State = {
        ...initialStateWithoutLayers,
        layers: [
          {
            id: 'layer-1',
            title: 'Button layer',
            component: 'Button',
            parent: null,
            repeat: 1,
            viewId: 'view-1',
            props: [
              {
                path: [{key: 'title', index: 0}],
                type: PropType.String,
                value: 'Title',
              },
              {
                path: [{key: 'title', index: 1}],
                type: PropType.String,
                value: 'Untouched title',
              },
            ],
          },
        ],
      };

      const action: Action = {
        type: 'SET_PROP',
        layerId: 'layer-1',
        propValue: {
          path: [{key: 'title', index: 1}],
          type: PropType.String,
          value: 'Updated title',
        },
      };
      const newState = reducer(state, action);
      const layer = newState.layers.find((layer) => layer.id === 'layer-1');
      expect(layer?.props).toEqual([
        layer?.props[0],
        {
          ...layer?.props[1],
          value: 'Updated title',
        },
      ]);
    });

    it('adds a new value if there is no value at the path ', () => {
      const state: State = {
        ...initialStateWithoutLayers,
        layers: [
          {
            id: 'layer-1',
            title: 'Button layer',
            component: 'Button',
            parent: null,
            repeat: 1,
            viewId: 'view-1',
            props: [
              {
                path: [{key: 'other', index: 0}],
                type: PropType.String,
                value: 'Untouched',
              },
            ],
          },
        ],
      };

      const action: Action = {
        type: 'SET_PROP',
        layerId: 'layer-1',
        propValue: {
          path: [{key: 'new', index: 0}],
          type: PropType.String,
          value: 'New title',
        },
      };
      const newState = reducer(state, action);
      const layer = newState.layers.find((layer) => layer.id === 'layer-1');
      expect(layer?.props).toEqual([
        state.layers[0].props[0],
        action.propValue,
      ]);
    });

    it('updates a prop value inside an arrayed item', () => {
      const state: State = {
        ...initialStateWithoutLayers,
        layers: [
          {
            id: 'layer-1',
            title: 'Button layer',
            component: 'Button',
            parent: null,
            repeat: 1,
            viewId: 'view-1',
            props: [
              {
                path: [{key: 'somethingElse', index: 0}],
                type: PropType.String,
                value: 'Untouched',
              },
              {
                path: [
                  {key: 'connectedDisclosure', index: 0},
                  {key: 'actions', index: 0},
                  {key: 'active', index: 0},
                ],
                type: PropType.Boolean,
                value: false,
              },
            ],
          },
        ],
      };

      const action: Action = {
        type: 'SET_PROP',
        layerId: 'layer-1',
        propValue: {
          path: [
            {key: 'connectedDisclosure', index: 0},
            {key: 'actions', index: 0},
            {key: 'active', index: 0},
          ],
          type: PropType.Boolean,
          value: true,
        },
      };
      const newState = reducer(state, action);
      const layer = newState.layers.find((layer) => layer.id === 'layer-1');
      expect(layer?.props).toMatchInlineSnapshot(`
        [
          {
            "path": [
              {
                "index": 0,
                "key": "somethingElse",
              },
            ],
            "type": "string",
            "value": "Untouched",
          },
          {
            "path": [
              {
                "index": 0,
                "key": "connectedDisclosure",
              },
              {
                "index": 0,
                "key": "actions",
              },
              {
                "index": 0,
                "key": "active",
              },
            ],
            "type": "boolean",
            "value": true,
          },
        ]
      `);
    });
  });
});

describe('REMOVE_PROP_VALUE', () => {
  it('throws an error if the layer does not exist', () => {});
  it('throws an error if the prop value does not exist', () => {});

  it('removes a prop value with siblings but no parents and ajusts the remaining indices', () => {
    const state: State = {
      ...initialStateWithoutLayers,
      layers: [
        {
          id: 'layer-1',
          title: 'Button layer',
          component: 'Button',
          parent: null,
          repeat: 1,
          viewId: 'view-1',
          props: [
            {
              path: [{key: 'something', index: 0}],
              type: PropType.String,
              value: 'Untouched',
            },
            {
              path: [{key: 'something', index: 1}],
              type: PropType.String,
              value: 'To be removed',
            },
            {
              path: [{key: 'something', index: 2}],
              type: PropType.String,
              value: 'Untouched',
            },
            {
              path: [{key: 'unrelated', index: 0}],
              type: PropType.String,
              value: 'Untouched',
            },
          ],
        },
      ],
    };

    const action: Action = {
      type: 'REMOVE_PROP_VALUE',
      layerId: 'layer-1',
      propPath: [{key: 'something', index: 1}],
    };
    const newState = reducer(state, action);
    const layer = newState.layers.find((layer) => layer.id === 'layer-1');
    expect(layer?.props).toMatchInlineSnapshot(`
      [
        {
          "path": [
            {
              "index": 0,
              "key": "unrelated",
            },
          ],
          "type": "string",
          "value": "Untouched",
        },
        {
          "path": [
            {
              "index": 0,
              "key": "something",
            },
          ],
          "type": "string",
          "value": "Untouched",
        },
        {
          "path": [
            {
              "index": 1,
              "key": "something",
            },
          ],
          "type": "string",
          "value": "Untouched",
        },
      ]
    `);
  });

  it('removes a prop value with siblings and parents and ajusts the remaining indices', () => {
    const state: State = {
      ...initialStateWithoutLayers,
      layers: [
        {
          id: 'layer-1',
          title: 'Button layer',
          component: 'Button',
          parent: null,
          repeat: 1,
          viewId: 'view-1',
          props: [
            {
              path: [
                {key: 'parent', index: 0},
                {key: 'child', index: 0},
              ],
              type: PropType.String,
              value: 'Untouched',
            },
            {
              path: [
                {key: 'parent', index: 0},
                {key: 'child', index: 1},
              ],
              type: PropType.String,
              value: 'To be removed',
            },
            {
              path: [
                {key: 'parent', index: 0},
                {key: 'child', index: 2},
              ],
              type: PropType.String,
              value: 'Untouched (previously at index 2)',
            },
            {
              path: [
                {key: 'otherPrent', index: 0},
                {key: 'child', index: 0},
              ],
              type: PropType.String,
              value: 'Untouched',
            },
            {
              path: [
                {key: 'other', index: 0},
                {key: 'child', index: 0},
              ],
              type: PropType.String,
              value: 'Untouched',
            },
          ],
        },
      ],
    };

    const action: Action = {
      type: 'REMOVE_PROP_VALUE',
      layerId: 'layer-1',
      propPath: [
        {key: 'parent', index: 0},
        {key: 'child', index: 1},
      ],
    };
    const newState = reducer(state, action);
    const layer = newState.layers.find((layer) => layer.id === 'layer-1');
    expect(layer?.props).toMatchInlineSnapshot(`
      [
        {
          "path": [
            {
              "index": 0,
              "key": "otherPrent",
            },
            {
              "index": 0,
              "key": "child",
            },
          ],
          "type": "string",
          "value": "Untouched",
        },
        {
          "path": [
            {
              "index": 0,
              "key": "other",
            },
            {
              "index": 0,
              "key": "child",
            },
          ],
          "type": "string",
          "value": "Untouched",
        },
        {
          "path": [
            {
              "index": 0,
              "key": "parent",
            },
            {
              "index": 0,
              "key": "child",
            },
          ],
          "type": "string",
          "value": "Untouched",
        },
        {
          "path": [
            {
              "index": 0,
              "key": "parent",
            },
            {
              "index": 1,
              "key": "child",
            },
          ],
          "type": "string",
          "value": "Untouched (previously at index 2)",
        },
      ]
    `);
  });
});
