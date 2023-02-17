import { Action, Layer, PropType, PropValue, State } from "./types";
import { nanoid } from "nanoid";
import { components } from "./components";
import set from "lodash.set";

export const reducer = (prevState: State, action: Action): State => {
  let state = { ...prevState };
  console.log({ log: "Reducer recieved an action...", action });

  switch (action.type) {
    case "ADD_LAYER": {
      const id = nanoid();

      const component = components[action.componentName];
      if (!component) {
        throw new Error(
          `Could not create Polaris component layer. Component "${action.componentName}" not found.`
        );
      }
      let defaultProps: { [key: string]: any } = {};
      Object.entries(component.props).forEach(([key, value]) => {
        defaultProps[key] = value.defaultValue;
      });

      const newLayer: Layer = {
        id,
        viewId: state.selectedViewId,
        parent: action.parent,
        title: "AutoLayout",
        component: action.componentName,
        props: { ...defaultProps },
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

    case "SELECT_LAYER": {
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

    case "SET_HOVERED_LAYER_ID": {
      state = {
        ...state,
        hoveredLayerId: action.layerId,
      };
      break;
    }

    case "SET_SELECTED_VIEW_ID": {
      state = {
        ...state,
        selectedViewId: action.viewId,
      };
      break;
    }

    case "SET_PROP": {
      state = {
        ...state,
        layers: [
          ...state.layers.map((layer) => {
            if (layer.id === action.layerId) {
              const path = `${action.propPath
                .split(".")
                .slice(1) // Remove prop. from key
                .join(".")}`;

              // TODO: Type this to be a PropValue
              const propValue = {
                type: action.propType,
                value: action.value,
              };
              return {
                ...layer,
                props: {
                  ...set(layer.props, path, propValue),
                },
              };
            }
            return layer;
          }),
        ],
      };
      break;
    }

    case "SHOW_LAYER_ADDER": {
      state = {
        ...state,
        layerAdderVisibility: action.parent,
      };
      break;
    }

    case "HIDE_LAYER_ADDER": {
      state = {
        ...state,
        layerAdderVisibility: false,
      };
      break;
    }

    case "UPDATE_APP_STATE": {
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
                          return {
                            ...row,
                            temporaryValue: action.value,
                          };
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
    }
  }

  console.log({ log: "Reducer is returning a new state...", state });

  return state;
};
