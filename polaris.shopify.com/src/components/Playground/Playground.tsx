import { useState, createElement, useCallback } from "react";
// import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import * as Polaris from "@shopify/polaris";
import propsData from "../../data/props.json";
import styles from "./Playground.module.scss";

interface Props {}

interface Layer {
  id: string;
  component: string;
  props: { [key: string]: string | number };
  children: Layer[];
}

function Playground({}: Props) {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: Math.random().toString(),
      component: "Page",
      props: {
        title: "Page",
      },
      children: [],
    },
  ]);
  const [selectedLayer, setSelectedLayer] = useState<string>(layers[0].id);
  const [nextLayerChildOf, setNextLayerChildOf] = useState<string | null>(null);

  const availableComponents = Object.keys(Polaris).filter((name) =>
    name.match(/^[A-Z][A-Za-z]+[a-z]$/)
  );

  function renderComponent(name: string, props: any, children: any) {
    // @ts-ignore
    const component = Polaris[name];

    return (
      <div style={{ border: "1px solid red" }}>
        {createElement(
          component,
          props,
          children
            ? props.children ||
                children.map((child: any) =>
                  renderComponent(child.component, child.props, child.children)
                )
            : undefined
        )}
      </div>
    );
  }

  function addLayer(component: string) {
    if (nextLayerChildOf) {
      setNextLayerChildOf(null);
      const parentLayer = layers.find((layer) => layer.id === nextLayerChildOf);
      if (parentLayer) {
        setLayers([
          ...layers.map((layer) => {
            if (layer.id === parentLayer.id) {
              return {
                ...layer,
                children: [
                  ...layer.children,
                  {
                    id: Math.random().toString(),
                    component,
                    props: {},
                    children: [],
                  },
                ],
              };
            }
            return layer;
          }),
        ]);
      }
    } else {
      setLayers([
        ...layers,
        {
          id: Math.random().toString(),
          component,
          props: {},
          children: [],
        },
      ]);
    }
  }

  function updateProps(propKey: string, propValue: any) {
    const newLayers: Layer[] = [
      ...layers.map((layer) => {
        if (layer.id === selectedLayer) {
          return {
            ...layer,
            props: {
              ...layer.props,
              [propKey]: propValue,
            },
          };
        }
        return layer;
      }),
    ];
    setLayers(newLayers);
  }

  const findLayerById = useCallback(
    (id: string): Layer | null => {
      let match: Layer | null = null;

      function walk(layers: Layer[]) {
        layers.forEach((layer) => {
          if (layer.id === id) {
            match = layer;
          } else {
            walk(layer.children);
          }
        });
      }

      walk(layers);

      return match;
    },
    [layers]
  );

  const getProps = useCallback((): any => {
    console.log({ selectedLayer, layers });
    const matchingLayer = findLayerById(selectedLayer);
    if (matchingLayer) {
      const match = propsData.find((item) =>
        item.id.endsWith(`${matchingLayer.component}Props`)
      );
      return match;
    }
  }, [layers, selectedLayer, findLayerById]);

  function getPropValue(propKey: string) {
    const matchingLayer = layers.find((layer) => layer.id === selectedLayer);
    if (matchingLayer) {
      const matchingProp = Object.entries(matchingLayer.props).find(
        ([key]) => key === propKey
      );
      if (matchingProp) {
        return matchingProp[1];
      }
    }
  }

  const propsForSelectedComponent = getProps();
  const { AppProvider, Page } = Polaris;

  return (
    <div className={styles.Playground}>
      <div className={styles.Layers}>
        {nextLayerChildOf && (
          <div className={styles.ComponentPicker}>
            {availableComponents
              .sort((a, b) => (a < b ? -1 : 1))
              .map((componentName) => (
                <li key={componentName} onClick={() => addLayer(componentName)}>
                  {componentName}
                </li>
              ))}
          </div>
        )}
        <button>Add</button>
        {layers.map((layer) => (
          <LayerListItem
            key={layer.id}
            layer={layer}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
            setNextLayerChildOf={setNextLayerChildOf}
          />
        ))}
      </div>

      <div className={styles.Canvas}>
        <div className="polaris-example">
          <AppProvider i18n={enTranslations}>
            {layers.map((layer) =>
              renderComponent(layer.component, layer.props, layer.children)
            )}
          </AppProvider>
        </div>
      </div>

      {propsForSelectedComponent && (
        <div>
          {propsForSelectedComponent.members?.map((member: any) => (
            <li key={selectedLayer + member.name}>
              {member.name}
              <br />
              {member.type.includes("string") ? (
                <input
                  type="text"
                  onChange={(evt) => {
                    updateProps(member.name, evt.target.value);
                  }}
                  value={getPropValue(member.name)}
                />
              ) : (
                member.type
              )}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

function LayerListItem({
  layer,
  selectedLayer,
  setSelectedLayer,
  setNextLayerChildOf,
}: {
  layer: Layer;
  selectedLayer: string;
  setSelectedLayer: (id: string) => void;
  setNextLayerChildOf: (id: string) => void;
}) {
  return (
    <li
      key={layer.id}
      data-current={selectedLayer === layer.id}
      onClick={(evt) => {
        evt.stopPropagation();
        setSelectedLayer(layer.id);
      }}
      style={{ paddingLeft: 20 }}
    >
      {layer.component}{" "}
      <button onClick={() => setNextLayerChildOf(layer.id)}>+</button>
      <ul>
        {layer.children.map((child) => (
          <LayerListItem
            key={child.id}
            layer={child}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
            setNextLayerChildOf={setNextLayerChildOf}
          />
        ))}
      </ul>
    </li>
  );
}

export default Playground;
