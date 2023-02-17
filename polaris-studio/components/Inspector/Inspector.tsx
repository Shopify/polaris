import { components } from "@/components";
import {
  AppActionType,
  Layer,
  PropDefinition,
  PropType,
  PropValue,
} from "@/types";
import { useContext } from "react";
import { StateContext } from "../App/App";
import { Switch } from "@headlessui/react";
import untypedComponentUsageSimplified from "../../data/componentsUsageSimplified.json";
import styles from "./Inspector.module.scss";

const componentUsageSimplified = untypedComponentUsageSimplified as {
  [key: string]: {
    total: {
      renders: number;
      properties: number;
      variants: number;
    };
    properties: {
      [key: string]: number;
    };
  };
};

interface Props {}

function Inspector({}: Props) {
  const { state } = useContext(StateContext);
  const { layers, views, selectedViewId } = state;

  const selectedView = views.find((view) => view.id === selectedViewId);
  if (!selectedView) return null;

  const { selectedLayerId } = selectedView;
  if (!selectedLayerId) return null;

  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId);
  if (!selectedLayer) return null;

  return <InspectorFields groupKeys={[]} layer={selectedLayer} />;
}

function getValue<T>(object: any, path: string): T {
  return path
    .replace(/\[/g, ".")
    .replace(/\]/g, "")
    .split(".")
    .reduce((o, k) => (o || {})[k], object);
}

function InspectorFields({
  groupKeys,
  layer,
}: {
  groupKeys: string[];
  layer: Layer;
}) {
  const { dispatch } = useContext(StateContext);

  let prevPropPath = `props`;
  if (groupKeys.length > 0) {
    prevPropPath = `${prevPropPath}.${groupKeys.join(".children.")}.children`;
  }

  console.log({ prevPropPath });

  const props = getValue<{ [key: string]: PropDefinition }>(
    components[layer.component],
    prevPropPath
  );

  console.log({ props });

  return (
    <div className={styles.Inspector}>
      {props &&
        Object.entries(props)
          .sort((a, b) => {
            return (
              (componentUsageSimplified[layer.component].properties[b[0]] ||
                0) -
              (componentUsageSimplified[layer.component].properties[a[0]] || 0)
            );
          })
          .map(([propKey, propDefinition]) => {
            const propPath = `${prevPropPath}.${propKey}`;
            const propValue = getValue<PropValue>(layer, propPath);
            const key = propPath;
            const label = propDefinition.alias || propKey || key || propKey;

            // if (!propValue) {
            //   // TODO: This shouldn't happen. This means that default props haven't
            //   // been created at propPath which is a bug. Ooooor, can we change the
            //   // system to not create any default props at all and just create
            //   // them on the fly when the user actually sets a prop? Hmm...
            //   return null;
            // }

            switch (propDefinition.type) {
              case PropType.String: {
                const value =
                  propValue && propValue.type === PropType.String
                    ? propValue.value
                    : propDefinition.defaultValue.value;
                return (
                  <div key={key}>
                    <label>{label}</label>
                    <input
                      type="text"
                      placeholder="Lorem ipsum dolor..."
                      value={value}
                      onChange={(evt) => {
                        let value: string | number | boolean = evt.target.value;

                        dispatch({
                          type: "SET_PROP",
                          layerId: layer.id,
                          propType: PropType.String,
                          propPath,
                          value,
                        });
                      }}
                    />
                  </div>
                );
              }

              case PropType.Number: {
                const value =
                  propValue && propValue.type === PropType.Number
                    ? propValue.value
                    : propDefinition.defaultValue.value;
                return (
                  <div key={key}>
                    <label>{label}</label>
                    <input
                      type="number"
                      value={value.toString()}
                      onChange={(evt) => {
                        let value: number = parseInt(evt.target.value);

                        dispatch({
                          type: "SET_PROP",
                          layerId: layer.id,
                          propType: PropType.Number,
                          propPath,
                          value,
                        });
                      }}
                    />
                  </div>
                );
              }

              case PropType.Boolean: {
                const value =
                  propValue && propValue.type === PropType.Boolean
                    ? propValue.value
                    : propDefinition.defaultValue.value;
                const checked = !!value;
                return (
                  <div key={key}>
                    {label}
                    <Switch
                      checked={checked}
                      onChange={(value: boolean) => {
                        dispatch({
                          type: "SET_PROP",
                          layerId: layer.id,
                          propType: PropType.Boolean,
                          propPath,
                          value,
                        });
                      }}
                      className={`${checked ? styles.checked : ""} ${
                        styles.Toggle
                      }`}
                    >
                      <span className="sr-only">{key}</span>
                      <span className={styles.Handle} />
                    </Switch>
                  </div>
                );
              }

              case PropType.Enum: {
                const value =
                  propValue && propValue.type === PropType.Enum
                    ? propValue.value
                    : propDefinition.defaultValue.value;
                return (
                  <div key={key}>
                    {label}
                    <select
                      value={value}
                      onChange={(evt) => {
                        dispatch({
                          type: "SET_PROP",
                          layerId: layer.id,
                          propType: PropType.Enum,
                          propPath,
                          value: evt.target.value,
                        });
                      }}
                    >
                      {propDefinition.options.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              case PropType.Action: {
                const value =
                  propValue && propValue.type === PropType.Action
                    ? propValue.value
                    : propDefinition.defaultValue.value;

                return (
                  <div>
                    {propKey}
                    {value.length > 0 && (
                      <ul>
                        {value.map((action, index) => {
                          switch (action.type) {
                            case AppActionType.Alert:
                              return (
                                <li key={index}>
                                  <input
                                    type="text"
                                    value={action.message}
                                    onChange={(evt) => {
                                      dispatch({
                                        type: "SET_PROP",
                                        layerId: layer.id,
                                        propPath,
                                        propType: PropType.Action,
                                        value: [
                                          ...value.slice(0, index),
                                          {
                                            ...action,
                                            message: evt.target.value,
                                          },
                                          ...value.slice(index + 1),
                                        ],
                                      });
                                    }}
                                  />
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: "SET_PROP",
                                        layerId: layer.id,
                                        propType: PropType.Action,
                                        propPath,
                                        value: [
                                          ...value.slice(0, index),
                                          ...value.slice(index + 1),
                                        ],
                                      });
                                    }}
                                  >
                                    Delete action
                                  </button>
                                </li>
                              );
                            case AppActionType.Navigate:
                              return <li key={index}>Navigate</li>;
                          }
                        })}
                      </ul>
                    )}
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SET_PROP",
                          layerId: layer.id,
                          propPath,
                          propType: PropType.Action,
                          value: [
                            ...value,
                            {
                              type: AppActionType.Alert,
                              message: "My message",
                            },
                          ],
                        })
                      }
                    >
                      Add action
                    </button>
                  </div>
                );
              }

              case PropType.Group: {
                const value =
                  propValue && propValue.type === PropType.Group
                    ? propValue.children
                    : propDefinition.defaultValue.children;

                return (
                  <li key={propKey}>
                    <>
                      <span className={styles.GroupTitle}>
                        {propKey} - {propDefinition.type}
                      </span>
                      {propDefinition.type === PropType.Group && (
                        <ul>
                          <InspectorFields
                            groupKeys={[...groupKeys, propKey]}
                            layer={layer}
                          />
                        </ul>
                      )}
                    </>
                  </li>
                );
              }
            }
          })}
    </div>
  );
}

export default Inspector;
