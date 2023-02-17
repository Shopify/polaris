import { components } from "@/components";
import { PropDefinition, PropType } from "@/types";
import { useContext } from "react";
import { StateContext } from "../App/App";
import styles from "./LayerList.module.scss";
import { Tooltip } from "react-tooltip";
import get from "lodash.get";

interface Props {}

function LayerList({}: Props) {
  const {
    state: { layers, selectedViewId },
    dispatch,
  } = useContext(StateContext);
  const topLevelLayers = layers
    .filter(({ viewId }) => viewId === selectedViewId)
    .filter(({ parent }) => parent === null);

  return (
    <div className={styles.LayerList}>
      {topLevelLayers.map((layer) => {
        return <Item key={layer.id} id={layer.id} />;
      })}
      <button
        onClick={() =>
          dispatch({
            type: "SHOW_LAYER_ADDER",
            parent: null,
          })
        }
      >
        Add layer
      </button>
    </div>
  );
}

// TODO: Support nested children
function getPropsThatCanHaveChildren(props: {
  [key: string]: PropDefinition;
}): {
  path: string;
}[] {
  let propsThatCanHaveChildren: {
    path: string;
  }[] = [];

  Object.entries(props).forEach(([key, prop]) => {
    if (prop.type === PropType.ReactNode) {
      propsThatCanHaveChildren.push({ path: key });
    }
  });

  return propsThatCanHaveChildren;
}

function Item({ id }: { id: string }) {
  const {
    state: { layers, views, selectedViewId, hoveredLayerId },
    dispatch,
  } = useContext(StateContext);

  const layer = layers.find((layer) => layer.id === id);
  if (!layer) return null;

  const selectedView = views.find(({ id }) => id === selectedViewId);
  if (!selectedView) return null;

  const selectedLayer = layers.find(
    ({ id }) => id === selectedView.selectedLayerId
  );
  const isSelected = !!(selectedLayer && selectedLayer.id === layer.id);

  let layerName = layer.component || layer.id;

  const { component } = layer;
  const propsWithChildren = getPropsThatCanHaveChildren(
    components[component].props
  );

  return (
    <li
      className={styles.Layer}
      data-is-selected={isSelected}
      data-is-hovered={hoveredLayerId === layer.id}
    >
      <span
        onClick={() =>
          dispatch({
            type: "SELECT_LAYER",
            layerId: layer.id,
          })
        }
        onMouseEnter={() =>
          dispatch({ type: "SET_HOVERED_LAYER_ID", layerId: layer.id })
        }
        onMouseLeave={() =>
          dispatch({
            type: "SET_HOVERED_LAYER_ID",
            layerId: null,
          })
        }
      >
        {layerName}
      </span>

      {propsWithChildren.length > 0 && (
        <ul className={styles.Children}>
          {propsWithChildren.map(({ path }) => {
            const childLayersForProp = layers.filter(
              (thisLayer) =>
                thisLayer.parent !== null &&
                thisLayer.parent.layerId === layer.id &&
                thisLayer.parent.propPath === `props.${path}`
            );
            const tooltipId = `add-layer-${layer.id}-${path}`;
            return (
              <li key={path}>
                {path}{" "}
                {childLayersForProp.map((layer) => (
                  <Item key={layer.id} id={layer.id} />
                ))}
                {childLayersForProp.length === 0 && (
                  <>
                    <button
                      className={styles.AddChild}
                      onClick={() => {
                        dispatch({
                          type: "SHOW_LAYER_ADDER",
                          parent: {
                            layerId: layer.id,
                            propPath: `props.${path}`,
                          },
                        });
                      }}
                      id={tooltipId}
                    >
                      +
                    </button>
                    <Tooltip
                      anchorId={tooltipId}
                      style={{
                        opacity: 1,
                        backgroundColor: "white",
                        color: "black",
                        maxWidth: 300,
                        textAlign: "center",
                      }}
                      delayShow={500}
                    >
                      {get(components[layer.component].props, path).description}
                    </Tooltip>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default LayerList;
