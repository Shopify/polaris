import {nanoid} from 'nanoid';
import {components} from './components';
import {Action, Layer, PropPath, PropType, PropValue, State} from './types';
import {
  getIndexFromPath,
  getPropValue,
  getPropValueSiblings,
  propPathsAreEqual,
  validatePropPath,
} from './utils';

export const reducer = (prevState: State, action: Action): State => {
  let state: State = {...prevState};
  console.log({log: 'Reducer recieved an action...', action});

  switch (action.type) {
    case 'ADD_LAYER': {
      const id = nanoid();

      const component = components[action.componentName];
      if (!component) {
        throw new Error(
          `Could not create Polaris component layer. Component "${action.componentName}" not found.`,
        );
      }

      const newLayer: Layer = {
        id,
        viewId: state.selectedViewId,
        parent: action.parent,
        title: 'AutoLayout',
        repeat: 1,
        component: action.componentName,
        props: [],
      };

      state = {
        ...state,
        views: [
          ...state.views.map((view) => {
            if (view.id === state.selectedViewId) {
              return {
                ...view,
                selectedLayerId: id,
              };
            }
            return view;
          }),
        ],
        layers: [...state.layers, newLayer],
      };

      break;
    }

    case 'SELECT_LAYER': {
      state = {
        ...state,
        views: [
          ...state.views.map((view) => {
            if (view.id === state.selectedViewId) {
              return {
                ...view,
                selectedLayerId: action.layerId,
              };
            }
            return view;
          }),
        ],
      };
      break;
    }

    case 'SET_HOVERED_LAYER_ID': {
      state = {
        ...state,
        hoveredLayerId: action.layerId,
      };
      break;
    }

    case 'SET_SELECTED_VIEW_ID': {
      state = {
        ...state,
        selectedViewId: action.viewId,
      };
      break;
    }

    case 'SET_LAYER_REPEAT': {
      state = {
        ...state,
        layers: [
          ...state.layers.map((layer) => {
            if (layer.id === action.layerId) {
              return {
                ...layer,
                repeat: action.repeat,
              };
            }
            return layer;
          }),
        ],
      };
      break;
    }

    case 'SET_PROP': {
      validatePropPath({
        propPath: action.propValue.path,
      });
      const index = getIndexFromPath(action.propValue.path);
      const layer = state.layers.find((layer) => layer.id === action.layerId);
      if (!layer) {
        throw new Error(
          `Could not set prop. Layer "${action.layerId}" not found.`,
        );
      }
      const propValue = getPropValue(layer, action.propValue.path);
      if (index > propValue.length + 1) {
        throw new Error(
          `Could not set prop. Index "${index}" is out of bounds.`,
        );
      }
      const valueExists = propValue.length > 0;
      if (valueExists) {
        state = {
          ...state,
          layers: [
            ...state.layers.map((layer) => {
              if (layer.id === action.layerId) {
                return {
                  ...layer,
                  props: layer.props.map((prop) => {
                    if (propPathsAreEqual(prop.path, action.propValue.path)) {
                      return action.propValue;
                    }
                    return prop;
                  }),
                };
              }
              return layer;
            }),
          ],
        };
      } else {
        state = {
          ...state,
          layers: [
            ...state.layers.map((layer) => {
              if (layer.id === action.layerId) {
                return {
                  ...layer,
                  props: [...layer.props, action.propValue],
                };
              }
              return layer;
            }),
          ],
        };
      }

      break;
    }

    case 'REMOVE_PROP_VALUE': {
      validatePropPath({
        propPath: action.propPath,
      });
      const layer = state.layers.find((layer) => layer.id === action.layerId);

      if (!layer) {
        throw new Error(
          `Could not remove prop value. Layer "${action.layerId}" not found.`,
        );
      }

      let siblingValues: PropValue[] = [];
      let nonSiblingValues: PropValue[] = [];

      siblingValues = getPropValueSiblings(layer, action.propPath);

      const stringifiedSiblingPaths = siblingValues.map((sibling) =>
        JSON.stringify(sibling.path),
      );
      nonSiblingValues = layer.props.filter(
        (prop) => !stringifiedSiblingPaths.includes(JSON.stringify(prop.path)),
      );
      console.log({stringifiedSiblingPaths, nonSiblingValues});

      siblingValues = [...siblingValues]
        .filter((value) => !propPathsAreEqual(value.path, action.propPath))
        .sort((a, b) => getIndexFromPath(a.path) - getIndexFromPath(b.path))
        .map((value, index) => {
          return {
            ...value,
            path: [...value.path].map((segment, segmentIndex) => {
              const isLastSegment = segmentIndex === value.path.length - 1;
              if (isLastSegment) {
                return {
                  ...segment,
                  index,
                };
              }
              return segment;
            }),
          };
        });

      state = {
        ...state,
        layers: [
          ...state.layers.map((layer) => {
            if (layer.id === action.layerId) {
              return {
                ...layer,
                props: [...nonSiblingValues, ...siblingValues],
              };
            }
            return layer;
          }),
        ],
      };

      break;
    }

    case 'SHOW_LAYER_ADDER': {
      state = {
        ...state,
        layerAdderVisibility: action.parent,
      };
      break;
    }

    case 'HIDE_LAYER_ADDER': {
      state = {
        ...state,
        layerAdderVisibility: false,
      };
      break;
    }

    case 'UPDATE_APP_STATE': {
      state = {
        ...state,
        appState: {
          ...state.appState,
          sheets: state.appState.sheets.map((sheet) => {
            if (sheet.id === action.sheetId) {
              return {
                ...sheet,
                columns: sheet.columns.map((column, columnIndex) => {
                  if (columnIndex === action.columnIndex) {
                    return {
                      ...column,
                      rows: column.rows.map((row, rowIndex) => {
                        if (rowIndex === action.rowIndex) {
                          if (action.temporaryState) {
                            return {
                              ...row,
                              temporaryValue: action.value,
                            };
                          } else {
                            return {
                              ...row,
                              value: action.value,
                            };
                          }
                        }
                        return row;
                      }),
                    };
                  }
                  return column;
                }),
              };
            }
            return sheet;
          }),
        },
      };
      break;
    }

    case 'ADD_APP_STATE_SHEET': {
      const rows: {value: string; temporaryValue: string | null}[] = [];

      for (let i = 0; i < 100; i++) {
        rows.push({
          value: '',
          temporaryValue: null,
        });
      }

      const columns: {name: string; rows: typeof rows}[] = [];

      for (let i = 0; i < 10; i++) {
        columns.push({
          name: '',
          rows,
        });
      }

      state = {
        ...state,
        appState: {
          ...state.appState,
          sheets: [
            ...state.appState.sheets,
            {
              id: nanoid(),
              name: 'New state',
              columns,
            },
          ],
        },
      };
      break;
    }
  }

  console.log({log: 'Reducer is returning a new state...', state});

  return state;
};
