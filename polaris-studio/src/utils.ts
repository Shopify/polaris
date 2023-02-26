import React, {
  createElement,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {initialState} from './components/App/App';
import {
  Action,
  AppActionSet,
  AppActionType,
  ComponentMap,
  Layer,
  MessageFromIframe,
  MessageToIframe,
  PropDefinition,
  PropPath,
  PropType,
  PropValue,
  ReactProps,
  State,
  UnindexedPropPath,
} from './types';

export function useIframeCommunication(): [
  state: State,
  dispatch: Dispatch<Action>,
] {
  const [state, setState] = useState<State>(initialState);

  const dispatch = (action: Action) => {
    const message: MessageFromIframe = {source: 'polaris-studio', action};
    console.log({log: 'Iframe is sending a message...', message});
    window.parent.postMessage(message);
  };

  useEffect(() => {
    console.log({log: 'Iframe is listening for messages...'});
    const listener = (event: MessageEvent<MessageToIframe>) => {
      const {state, source} = event.data;
      if (source !== 'polaris-studio') return;
      console.log({log: 'Iframe recieved a message...', state});
      setState(state);
    };
    window.addEventListener('message', listener, false);
    return () => window.removeEventListener('message', listener);
  }, []);

  return [state, dispatch];
}

export const slugify = (str: string): string => {
  return (
    str
      // Camel to hyphen case
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces with hyphens
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
  );
};

export const className = (
  ...classNames: (string | boolean | null | undefined)[]
): string => {
  return classNames.filter((className) => Boolean(className)).join(' ');
};

export const getPropDefinition = (
  components: ComponentMap,
  layer: Layer,
  propPath: PropPath,
): PropDefinition | null => {
  const propDefinitions = components[layer.component].props;

  function recursivelySearch(
    propDefinitionNode: {
      [key: string]: PropDefinition;
    },
    level: number,
  ): PropDefinition | null {
    const currentSegment = propPath[level];
    const propDefinition = propDefinitionNode[currentSegment.key];
    if (propDefinition) {
      if (level === propPath.length - 1) {
        return propDefinition;
      } else {
        if (propDefinition.type === PropType.Group) {
          return recursivelySearch(propDefinition.children, level + 1);
        }
      }
    }
    return null;
  }

  return recursivelySearch(propDefinitions, 0);
};

export const getPropDefinitions = (
  components: ComponentMap,
  layer: Layer,
): {[key: string]: PropDefinition} | null => {
  const propDefinitions = components[layer.component].props;
  return propDefinitions || null;
};

// Unrelated TODO: Add sorting of grouped+arrayed values

export const getPropValue = (layer: Layer, propPath: PropPath): PropValue[] => {
  return layer.props.filter((prop) => {
    return JSON.stringify(prop.path) === JSON.stringify(propPath);
  });
};

export const getPropValueSiblings = (
  layer: Layer,
  propPath: PropPath,
): PropValue[] => {
  return layer.props.filter((propValue) => {
    let isSibling = true;

    if (propPath.length === propValue.path.length) {
      propValue.path.forEach((segment, index) => {
        const isLastSegment = index === propPath.length - 1;
        if (isLastSegment) {
          if (segment.key !== propPath[index].key) {
            isSibling = false;
          }
        } else {
          const segmentAndIndexMatch =
            segment.key === propPath[index].key &&
            segment.index === propPath[index].index;
          if (!segmentAndIndexMatch) {
            isSibling = false;
          }
        }
      });
    } else {
      isSibling = false;
    }

    return isSibling;
  });
};

// TODO: Is this the same as getPropValueSiblings?
export const getPropValues = (
  layer: Layer,
  propPath: UnindexedPropPath,
): PropValue[] => {
  return layer.props.filter((prop) => {
    let allSegmentsMatch = true;
    if (prop.path.length === propPath.length) {
      prop.path.forEach((segment, index) => {
        const isLastSegment = index === propPath.length - 1;
        if (isLastSegment) {
          if (segment.key !== propPath[index].key) {
            allSegmentsMatch = false;
          }
        } else {
          const segmentAndIndexMatch =
            segment.key === propPath[index].key &&
            segment.index === propPath[index].index;
          if (!segmentAndIndexMatch) {
            allSegmentsMatch = false;
          }
        }
      });
    } else {
      allSegmentsMatch = false;
    }
    return allSegmentsMatch;
  });
};

export const validatePropPath = ({propPath}: {propPath: PropPath}): void => {
  propPath.forEach((segment) => {
    const isAlphabetic = !!segment.key.match(/^[a-z]+$/i);

    if (segment.index < 0) {
      throw new Error(
        `Every segment key must be a non-negative integer. "${segment.key}[${
          segment.index
        }]" breaks this rule. Full path: "${JSON.stringify(propPath)}"`,
      );
    }

    if (!isAlphabetic) {
      throw new Error(
        `Every segment must be alphabetic. If it has an index, it bust be a positive integer. The segment "${
          segment.key
        }" breaks this rule. Full path: "${JSON.stringify(propPath)}"`,
      );
    }
  });
};

export function createReactProps({
  components,
  state,
  dispatch,
  layer,
  incomingPropDefinitions,
  propPath,
}: {
  components: ComponentMap;
  state: State;
  dispatch: Dispatch<Action>;
  layer: Layer;
  incomingPropDefinitions?: {[key: string]: PropDefinition};
  propPath: PropPath;
}) {
  if (propPath) {
    validatePropPath({propPath});
  }
  let returnedProps: ReactProps = {};
  let propDefinitions =
    incomingPropDefinitions || getPropDefinitions(components, layer);

  if (!propDefinitions) {
    throw new Error('Prop definitions not found');
  }

  Object.entries(propDefinitions).forEach(([key, propDefinition]) => {
    const newPropPath: UnindexedPropPath = [...propPath, {key}];
    const values = getPropValues(layer, newPropPath);

    if (propDefinition.type === PropType.Group || values.length > 0) {
      switch (propDefinition.type) {
        case PropType.Group:
          const recursiveArguments = {
            components,
            state,
            dispatch,
            layer,
            incomingPropDefinitions: propDefinition.children,
          };
          if (propDefinition.isArrayed) {
            let subProps: ReactProps[] = [];

            values.forEach((_, index) => {
              const newPropPath: PropPath = [...propPath, {key, index}];
              const childProps = createReactProps({
                ...recursiveArguments,
                propPath: newPropPath,
              });
              subProps.push(childProps);
            });
            // TODO: ADD TESTS
            if (propDefinition.isRequired) {
              returnedProps[key] = subProps;
            }
          } else {
            const newPropPath: PropPath = [...propPath, {key, index: 0}];
            const childProps = createReactProps({
              ...recursiveArguments,
              propPath: newPropPath,
            });
            // TODO: ADD TESTS
            if (propDefinition.isRequired) {
              returnedProps[key] = childProps;
            }
          }
          break;

        case PropType.Action:
          const fn = combineAppActions({
            state,
            dispatch,
            appActionSets: values.map((value) => value.value),
          });
          returnedProps[key] = fn;
          break;

        default:
          returnedProps[key] = propDefinition.isArrayed
            ? values.map((value) => value.value)
            : values[0].value;
          break;
      }
    } else {
      if (propDefinition.isRequired && propDefinition.defaultValue) {
        returnedProps[key] = propDefinition.isArrayed
          ? [propDefinition.defaultValue.value]
          : propDefinition.defaultValue.value;
      }
    }

    if (propDefinition.type === PropType.ReactNode) {
      const propDefinitionKeys: string[] = [
        ...propPath.map(({key}) => key),
        key,
      ];
      const childLayers = getChildLayers(state, layer, propDefinitionKeys);
      const childLayerNodes: ReactNode[] = [];

      childLayers.forEach((childLayer, index) => {
        const component = components[childLayer.component].reactComponent;
        const props: ReactProps = {
          key,
          ...createReactProps({
            components,
            state,
            dispatch,
            layer: childLayer,
            propPath: [],
          }),
        };
        const childElement = createElement(component, props);
        childLayerNodes.push(childElement);
      });

      if (childLayerNodes.length > 0) {
        returnedProps[key] = propDefinition.isArrayed
          ? childLayerNodes
          : childLayerNodes[0];
      } else if (propDefinition.isRequired) {
        returnedProps[key] = createElement(React.Fragment, {});
      }
    }
  });

  return returnedProps;
}

export function getIndexFromPath(path: PropPath): number {
  return path[path.length - 1].index;
}

export function getPropsThatCanHaveChildren(
  components: ComponentMap,
  layer: Layer,
): PropPath[] {
  let propsThatCanHaveChildren: PropPath[] = [];

  function recursivelySearch(
    propDefinitionNode: {
      [key: string]: PropDefinition;
    },
    pathSoFar?: PropPath,
  ): PropDefinition | null {
    Object.entries(propDefinitionNode).forEach(([key, propDefinition]) => {
      const newPathSoFar: PropPath = [...(pathSoFar || []), {key, index: 0}];
      if (propDefinition.type === PropType.Group) {
        recursivelySearch(propDefinition.children, newPathSoFar);
      } else if (propDefinition.type === PropType.ReactNode) {
        propsThatCanHaveChildren.push(newPathSoFar);
      }
    });
    return null;
  }

  const propDefinitions = getPropDefinitions(components, layer);
  if (!propDefinitions) throw new Error('Prop definitions not found');
  recursivelySearch(propDefinitions);

  return propsThatCanHaveChildren;
}

export const getChildLayers = (
  state: State,
  layer: Layer,
  propDefinitionKeys: string[],
): Layer[] => {
  const {layers} = state;

  return layers.filter((thisLayer) => {
    return (
      thisLayer.parent !== null &&
      thisLayer.parent.layerId === layer.id &&
      JSON.stringify(thisLayer.parent.propDefinitionKeys) ===
        JSON.stringify(propDefinitionKeys)
    );
  });
};

export const propPathsAreEqual = (a: PropPath, b: PropPath): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const combineAppActions = ({
  state,
  dispatch,
  appActionSets,
}: {
  state: State;
  dispatch: Dispatch<Action>;
  appActionSets: AppActionSet[];
}): (() => void) => {
  let actions: (() => void)[] = [];

  appActionSets.forEach((appActionSet) => {
    appActionSet.forEach((action) => {
      switch (action.type) {
        case AppActionType.Alert:
          actions.push(() => alert(action.message));
          break;

        case AppActionType.Navigate:
          actions.push(() =>
            dispatch({
              type: 'SET_SELECTED_VIEW_ID',
              viewId: action.viewId,
            }),
          );
          break;

        case AppActionType.SetState:
          actions.push(() => {
            const appStateKey = parseAppStateKey(
              // injectVariables(state, action.key, variables),
              injectVariables(state, action.key, {}),
            );
            if (appStateKey) {
              dispatch({
                type: 'UPDATE_APP_STATE',
                sheetId: state.appState.sheets[0].id,
                columnIndex: appStateKey.columnIndex,
                rowIndex: appStateKey.rowIndex,
                // value: injectVariables(state, action.value, variables),
                value: injectVariables(state, action.value, {}),
                temporaryState: true,
              });
            }
          });
      }
    });
  });
  const fn = () => actions.forEach((action) => action());
  return fn;
};

export const propDefinitionHasUnparsableRequiredProps = (propDefinitionMap: {
  [key: string]: PropDefinition;
}): boolean => {
  let hasUnparsable = false;

  function search(currentPropDefinitionMap: {[key: string]: PropDefinition}) {
    Object.values(currentPropDefinitionMap).forEach((currentPropDefinition) => {
      if (currentPropDefinition.type === PropType.Group) {
        search(currentPropDefinition.children);
      }
      if (
        currentPropDefinition.type === PropType.Unparsable &&
        currentPropDefinition.isRequired
      ) {
        hasUnparsable = true;
        return;
      }
    });
  }

  search(propDefinitionMap);

  return hasUnparsable;
};

const sheetRegex = /{([A-Z]+):([0-9]+)}/g;

const parseAppStateKey = (
  text: string,
): {sheetId: string | null; columnIndex: number; rowIndex: number} | null => {
  const [col, row] = text.split(':').map((part) => part.trim());
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  const columnIndex = alphabet.indexOf(col);
  const rowIndex = parseInt(row) - 1;

  return {
    sheetId: null,
    columnIndex,
    rowIndex,
  };
};

const injectVariables = (
  state: State,
  text: string,
  variables?: {[key: string]: string},
): string => {
  let output = text;

  if (variables) {
    Object.entries(variables).forEach(([key, value]) => {
      output = output.replaceAll(`$${key}`, value);
    });
  }

  output = output.replace(sheetRegex, (match, col, row) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    const colIndex = alphabet.indexOf(col);
    const rowIndex = parseInt(row) - 1;
    const value = state.appState.sheets[0].columns[colIndex].rows[rowIndex];
    if (value) {
      return value.temporaryValue || value.value;
    } else {
      return '';
    }
  });

  return output;
};
