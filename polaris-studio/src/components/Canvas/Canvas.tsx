import styles from './Canvas.module.scss';
import {AppProvider, Frame} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import {Action, State} from '../../types';
import {components} from '../../components';
import React, {
  createElement,
  Dispatch,
  Fragment,
  ReactNode,
  useState,
} from 'react';
import {createReactProps, useIframeCommunication} from '../../utils';

const getLayerHTMLId = (id: string): string => {
  return `rendered-layer-${id}`;
};

function Canvas() {
  const [state, dispatch] = useIframeCommunication();

  const [calloutPosition, setCalloutPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // useEffect(() => {
  //   if (!state.hoveredLayerId) return;

  //   const id = `#${getLayerHTMLId(state.hoveredLayerId)}`;
  //   const hoveredElementId = document.querySelector(id) as HTMLElement;
  //   if (!hoveredElementId) return;

  //   const {top, left, width, height} = hoveredElementId.getBoundingClientRect();
  //   setCalloutPosition({top, left, width, height});
  // }, [state.hoveredLayerId, state.layers]);

  return (
    <div className={styles.Canvas}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@10.31.0/build/esm/styles.css"
      />

      {state.hoveredLayerId && (
        <div
          className={styles.Callout}
          style={{
            top: calloutPosition.top,
            left: calloutPosition.left,
            width: calloutPosition.width,
            height: calloutPosition.height,
          }}
        ></div>
      )}

      <AppProvider i18n={enTranslations}>
        <Frame>
          <div className={styles.Views}>
            {Object.values(state.views)
              .filter((view) => view.type === 'View')
              .map((view) => {
                return (
                  <div key={view.id} className={styles.View}>
                    <div
                      className={styles.ViewLabel}
                      onClick={() =>
                        dispatch({
                          type: 'SET_SELECTED_VIEW_ID',
                          viewId: view.id,
                        })
                      }
                    >
                      {view.name}
                    </div>
                    <div
                      className={styles.ViewContent}
                      data-is-selected={state.selectedViewId === view.id}
                    >
                      {Object.values(state.layers)
                        .filter(({viewId}) => viewId === view.id)
                        .filter(({parent}) => parent === null)
                        .map(({id}, iteration) => {
                          return renderLayer({
                            layerId: id,
                            state,
                            dispatch,
                          });
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </Frame>
      </AppProvider>
    </div>
  );
}

const renderLayer = ({
  layerId,
  state,
  dispatch,
  iteration,
  preventRepeat,
  inheritedVariables,
}: {
  layerId: string;
  state: State;
  dispatch: Dispatch<Action>;
  iteration?: number;
  preventRepeat?: true;
  inheritedVariables?: {[key: string]: string};
}): React.ReactNode => {
  const layer = state.layers.find((layer) => layer.id === layerId);
  if (!layer) return null;
  const {component} = layer;

  const alphabet = 'ijklmnopqrstuvwxyz'.split('');
  const iterationKey = inheritedVariables
    ? alphabet[Object.keys(inheritedVariables).length]
    : alphabet[0];

  if (layer.repeat > 1 && !preventRepeat) {
    let children: ReactNode[] = [];
    [...Array(layer.repeat)].forEach((_, index) => {
      children.push(
        renderLayer({
          layerId: layer.id,
          state,
          dispatch,
          iteration: index + 1,
          preventRepeat: true,
          inheritedVariables,
        }),
      );
    });
    return createElement(
      Fragment,
      {
        key: layer.id,
      },
      children,
    );
  }
  let variables: {[key: string]: string} = {
    ...inheritedVariables,
    [iterationKey]: iteration ? iteration.toString() : '1',
  };

  console.log('les go', {state, layer});

  let reactProps = createReactProps({
    components,
    state,
    dispatch,
    layer,
    propPath: [],
  });

  console.log('reactProps', reactProps);

  const reactComponent = components[component].reactComponent;

  return createElement(reactComponent, {
    ...reactProps,
    key: layer.id,
  });
};

export default Canvas;
