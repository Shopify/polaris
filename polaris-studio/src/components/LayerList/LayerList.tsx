import {useContext} from 'react';
import {StateContext} from '../App/App';
import styles from './LayerList.module.scss';
import {
  getChildLayers,
  getPropsThatCanHaveChildren,
  propPathsAreEqual,
} from '../../utils';
import {components} from '../../components';

interface Props {}

function LayerList({}: Props) {
  const {
    state: {layers, selectedViewId},
    dispatch,
  } = useContext(StateContext);
  const topLevelLayers = layers
    .filter(({viewId}) => viewId === selectedViewId)
    .filter(({parent}) => parent === null);

  return (
    <div className={styles.LayerList}>
      <button
        onClick={() =>
          dispatch({
            type: 'SHOW_LAYER_ADDER',
            parent: null,
          })
        }
        className={styles.AddLayer}
      >
        Add layer
      </button>
      {topLevelLayers.map((layer) => {
        return <Item key={layer.id} id={layer.id} />;
      })}
    </div>
  );
}

function Item({id}: {id: string}) {
  const {state, dispatch} = useContext(StateContext);
  const {layers, views, selectedViewId, hoveredLayerId} = state;

  const layer = layers.find((layer) => layer.id === id);
  if (!layer) return null;

  const selectedView = views.find(({id}) => id === selectedViewId);
  if (!selectedView) return null;

  const selectedLayer = layers.find(
    ({id}) => id === selectedView.selectedLayerId,
  );
  const isSelected = !!(selectedLayer && selectedLayer.id === layer.id);

  let layerName = layer.component || layer.id;

  const propsWithChildren = getPropsThatCanHaveChildren(components, layer);

  return (
    <li
      className={styles.Layer}
      data-is-selected={isSelected}
      data-is-hovered={hoveredLayerId === layer.id}
    >
      <span
        onClick={() =>
          dispatch({
            type: 'SELECT_LAYER',
            layerId: layer.id,
          })
        }
        onMouseEnter={() =>
          dispatch({type: 'SET_HOVERED_LAYER_ID', layerId: layer.id})
        }
        onMouseLeave={() =>
          dispatch({
            type: 'SET_HOVERED_LAYER_ID',
            layerId: null,
          })
        }
      >
        {layerName}
        <input
          type="number"
          value={layer.repeat}
          onChange={(evt) =>
            dispatch({
              type: 'SET_LAYER_REPEAT',
              layerId: layer.id,
              repeat: parseInt(evt.target.value),
            })
          }
        />
      </span>

      {propsWithChildren.length > 0 && (
        <ul className={styles.Children}>
          {propsWithChildren.map((path) => {
            const propDefinitionKeys = path.map((p) => p.key);
            const childLayersForProp = getChildLayers(
              state,
              layer,
              propDefinitionKeys,
            );
            const tooltipId = `add-layer-${layer.id}-${path}`;
            console.log({propsWithChildren});
            return (
              <li key={JSON.stringify(path)}>
                {JSON.stringify(path)}
                <button
                  className={styles.AddChild}
                  onClick={() => {
                    dispatch({
                      type: 'SHOW_LAYER_ADDER',
                      parent: {
                        layerId: layer.id,
                        propDefinitionKeys,
                      },
                    });
                  }}
                  id={tooltipId}
                >
                  +
                </button>
                {childLayersForProp.map((layer) => (
                  <Item key={layer.id} id={layer.id} />
                ))}
                <>
                  {/* <Tooltip
                    anchorId={tooltipId}
                    style={{
                      opacity: 1,
                      backgroundColor: 'white',
                      color: 'black',
                      maxWidth: 300,
                      textAlign: 'center',
                    }}
                    delayShow={500}
                  >
                    {get(components[layer.component].props, path).description}
                  </Tooltip> */}
                </>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default LayerList;
