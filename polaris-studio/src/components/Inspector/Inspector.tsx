import {Switch} from '@headlessui/react';
import {ReactNode, useContext, useId} from 'react';
import {Tooltip} from 'react-tooltip';
import {components} from '../../components';
import untypedComponentUsageSimplified from '../../data/componentsUsageSimplified.json';
import {
  AppActionSet,
  AppActionType,
  Layer,
  PropPath,
  PropType,
  PropValue,
} from '../../types';
import {getPropDefinition, getPropDefinitions, getPropValue} from '../../utils';
import {StateContext} from '../App/App';
import styles from './Inspector.module.scss';

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

function Inspector() {
  return <p>Inspect</p>;
  const {state} = useContext(StateContext);
  const {layers, views, selectedViewId} = state;

  const selectedView = views.find((view) => view.id === selectedViewId);
  if (!selectedView) return null;

  const {selectedLayerId} = selectedView;
  if (!selectedLayerId) return null;

  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId);
  if (!selectedLayer) return null;

  return <InspectorFields prevPropPath={[]} layer={selectedLayer} />;
}

function LabelTooltip({
  tooltipContent,
  children,
}: {
  tooltipContent: string;
  children: ReactNode;
}) {
  const id = useId();

  return (
    <>
      <label id={id}>{children}</label>
      <Tooltip
        anchorId={id}
        style={{
          opacity: 1,
          backgroundColor: 'white',
          color: 'black',
          maxWidth: 300,
          textAlign: 'center',
        }}
        delayShow={500}
      >
        {tooltipContent}
      </Tooltip>
    </>
  );
}

function InspectorFields({
  layer,
  prevPropPath,
}: {
  layer: Layer;
  prevPropPath: PropPath;
}) {
  const {state, dispatch} = useContext(StateContext);
  const {views} = state;

  let propDefinitions = getPropDefinitions(components, layer);
  if (prevPropPath.length) {
    const x = getPropDefinition(components, layer, prevPropPath);
    if (x && x.type === PropType.Group) {
      propDefinitions = x.value;
    }
  }

  console.log({prevPropPath, propDefinitions});

  return (
    <div className={styles.Inspector}>
      {prevPropPath.length === 0 && (
        <p>{components[layer.component].description}</p>
      )}
      {propDefinitions &&
        Object.entries(propDefinitions)
          .sort((a, b) => {
            return componentUsageSimplified[layer.component]
              ? (componentUsageSimplified[layer.component].properties[b[0]] ||
                  0) -
                  (componentUsageSimplified[layer.component].properties[a[0]] ||
                    0)
              : 0;
          })
          .map(([propKey, propDefinition]) => {
            const propPath: PropPath = [...prevPropPath, {node: propKey}];
            const propValue = getPropValue(layer, propPath);
            const key = propPath[propPath.length - 1].node;
            const label = propKey || propPath[propPath.length - 1].node;
            const value = propValue?.value
              ? propValue.value
              : propDefinition.defaultValue.value;

            // if (!propValue) {
            //   // TODO: This shouldn't happen. This means that default props haven't
            //   // been created at propPath which is a bug. Ooooor, can we change the
            //   // system to not create any default props at all and just create
            //   // them on the fly when the user actually sets a prop? Hmm...
            //   return null;
            // }

            switch (propDefinition.type) {
              case PropType.String: {
                return (
                  <InspectorRow
                    label={label}
                    tooltip={propDefinition.description}
                    isArrayed={propDefinition.isArrayed}
                    value={value}
                    renderField={(index) => (
                      <input
                        type="text"
                        placeholder="Lorem ipsum dolor..."
                        value={value[index].toString()}
                        onChange={(evt) => {
                          let value: string = evt.target.value;

                          dispatch({
                            type: 'SET_PROP',
                            layerId: layer.id,
                            propPath,
                            value: {
                              type: PropType.String,
                              value: [value],
                            },
                            index,
                          });
                        }}
                      />
                    )}
                  />
                );
              }

              case PropType.Number: {
                return (
                  <InspectorRow
                    label={label}
                    tooltip={propDefinition.description}
                    isArrayed={propDefinition.isArrayed}
                    value={value}
                    renderField={(index) => (
                      <input
                        type="number"
                        value={value[index].toString()}
                        onChange={(evt) => {
                          let value: number = parseInt(evt.target.value);

                          dispatch({
                            type: 'SET_PROP',
                            layerId: layer.id,
                            propPath,
                            value: {
                              type: PropType.Number,
                              value: [value],
                            },
                            index,
                          });
                        }}
                      />
                    )}
                  />
                );
              }

              case PropType.Boolean: {
                return (
                  <InspectorRow
                    label={label}
                    tooltip={propDefinition.description}
                    isArrayed={propDefinition.isArrayed}
                    value={value}
                    renderField={(index) => {
                      const checked = !!value[index];
                      return (
                        <Switch
                          checked={checked}
                          onChange={(value: boolean) => {
                            dispatch({
                              type: 'SET_PROP',
                              layerId: layer.id,
                              propPath,
                              value: {
                                type: PropType.Boolean,
                                value: [value],
                              },
                              index,
                            });
                          }}
                          className={`${checked ? styles.checked : ''} ${
                            styles.Toggle
                          }`}
                        >
                          <span className="sr-only">{key}</span>
                          <span className={styles.Handle} />
                        </Switch>
                      );
                    }}
                  />
                );
              }

              case PropType.Enum: {
                return (
                  <InspectorRow
                    label={label}
                    tooltip={propDefinition.description}
                    isArrayed={propDefinition.isArrayed}
                    value={value}
                    renderField={(index) => (
                      <select
                        value={value[index].toString()}
                        onChange={(evt) => {
                          dispatch({
                            type: 'SET_PROP',
                            layerId: layer.id,
                            propPath,
                            value: {
                              type: PropType.Enum,
                              value: [evt.target.value],
                            },
                            index,
                          });
                        }}
                      >
                        {propDefinition.options.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                );
              }

              case PropType.Action: {
                return (
                  <InspectorRow
                    label={label}
                    tooltip={propDefinition.description}
                    isArrayed={propDefinition.isArrayed}
                    value={value}
                    renderField={(index) => {
                      return (
                        <select
                          onChange={(e) => {
                            let appActions: AppActionSet = [...value[index]];

                            if (e.target.value === AppActionType.Alert) {
                              appActions.push({
                                type: AppActionType.Alert,
                                message: 'My message',
                              });
                            }

                            if (e.target.value === AppActionType.Navigate) {
                              appActions.push({
                                type: AppActionType.Navigate,
                                viewId: Object.values(views)[0].id,
                              });
                            }

                            if (e.target.value === AppActionType.SetState) {
                              appActions.push({
                                type: AppActionType.SetState,
                                key: '',
                                value: '',
                              });
                            }

                            // dispatch({
                            //   type: 'SET_PROP',
                            //   layerId: layer.id,
                            //   propPath,
                            //   propType: PropType.Action,
                            //   value: newValue,
                            // });
                          }}
                        >
                          {Object.values(AppActionType).map((type) => (
                            <option>{type}</option>
                          ))}
                        </select>
                      );
                    }}
                    renderChildren={() => {
                      if (value.length > 0) {
                        return (
                          <ul className={styles.ActionList}>
                            {value.map((appActionSet, index) => {
                              return appActionSet.map((appAction) => {
                                switch (appAction.type) {
                                  case AppActionType.Alert:
                                    return (
                                      <li key={index}>
                                        <label>Alert </label>
                                        <input
                                          type="text"
                                          value={appAction.message}
                                          onChange={(evt) => {
                                            // dispatch({
                                            //   type: 'SET_PROP',
                                            //   layerId: layer.id,
                                            //   propPath,
                                            //   propType: PropType.Action,
                                            //   value: [
                                            //     ...value.slice(0, index),
                                            //     {
                                            //       ...action,
                                            //       message: evt.target.value,
                                            //     },
                                            //     ...value.slice(index + 1),
                                            //   ],
                                            // });
                                          }}
                                        />
                                        {/* <button
                                        onClick={() => {
                                          dispatch({
                                            type: 'SET_PROP',
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
                                      </button> */}
                                      </li>
                                    );

                                  case AppActionType.Navigate:
                                    return (
                                      <li key={index}>
                                        <label>Navigate to </label>
                                        <select
                                          value={appAction.viewId}
                                          onChange={(evt) => {
                                            // dispatch({
                                            //   type: 'SET_PROP',
                                            //   layerId: layer.id,
                                            //   propPath,
                                            //   propType: PropType.Action,
                                            //   value: [
                                            //     ...value.slice(0, index),
                                            //     {
                                            //       ...action,
                                            //       viewId: evt.target.value,
                                            //     },
                                            //     ...value.slice(index + 1),
                                            //   ],
                                            // });
                                          }}
                                        >
                                          {Object.values(views)
                                            .filter(
                                              (view) => view.type === 'View',
                                            )
                                            .map((view) => (
                                              <option
                                                key={view.id}
                                                value={view.id}
                                              >
                                                {view.name}
                                              </option>
                                            ))}
                                        </select>
                                      </li>
                                    );

                                  case AppActionType.SetState:
                                    return (
                                      <li
                                        key={index}
                                        className={styles.setState}
                                      >
                                        <label>Set state </label>
                                        <InspectorRow
                                          label="Key"
                                          tooltip=""
                                          isArrayed={false}
                                          value={value}
                                          renderField={() => (
                                            <input
                                              type="text"
                                              onChange={(evt) => {
                                                // dispatch({
                                                //   type: 'SET_PROP',
                                                //   layerId: layer.id,
                                                //   propPath,
                                                //   propType: PropType.Action,
                                                //   value: [
                                                //     ...value.slice(0, index),
                                                //     {
                                                //       ...action,
                                                //       key: evt.target.value,
                                                //     },
                                                //     ...value.slice(index + 1),
                                                //   ],
                                                // });
                                              }}
                                              value={appAction.key}
                                            />
                                          )}
                                        />

                                        <InspectorRow
                                          label="Value"
                                          tooltip=""
                                          isArrayed={false}
                                          value={value}
                                          renderField={() => (
                                            <input
                                              type="text"
                                              onChange={(evt) => {
                                                // dispatch({
                                                //   type: 'SET_PROP',
                                                //   layerId: layer.id,
                                                //   propPath,
                                                //   propType: PropType.Action,
                                                //   value: [
                                                //     ...value.slice(0, index),
                                                //     {
                                                //       ...action,
                                                //       value: evt.target.value,
                                                //     },
                                                //     ...value.slice(index + 1),
                                                //   ],
                                                // });
                                              }}
                                              value={appAction.value}
                                            />
                                          )}
                                        />
                                      </li>
                                    );
                                }
                              });
                            })}
                          </ul>
                        );
                      }
                      return null;
                    }}
                  />
                );
              }

              case PropType.Group: {
                return (
                  <InspectorRow
                    label={label}
                    tooltip={propDefinition.description}
                    isArrayed={propDefinition.isArrayed}
                    value={value}
                    renderChildren={() => {
                      return (
                        <InspectorFields
                          prevPropPath={[...prevPropPath, {node: propKey}]}
                          layer={layer}
                        />
                      );
                    }}
                  />
                );
              }
            }
          })}
    </div>
  );
}

function InspectorRow({
  label,
  tooltip,
  isArrayed,
  value,
  renderField,
  renderChildren,
}: {
  label: string;
  tooltip: string;
  isArrayed: boolean;
  value: PropValue['value'];
  renderField?: (index: number) => React.ReactNode;
  renderChildren?: () => React.ReactNode;
}) {
  return (
    <div className={styles.InspectorRow}>
      <div className={styles.LabelAndField}>
        <LabelTooltip tooltipContent={tooltip}>{label}</LabelTooltip>
        {renderField &&
          (value.length > 0
            ? value.map((_, index) => renderField(index))
            : renderField(0))}
      </div>
      {renderChildren && (
        <div className={styles.Children}>{renderChildren()}</div>
      )}
      {isArrayed && <button>+</button>}
    </div>
  );
}

export default Inspector;
