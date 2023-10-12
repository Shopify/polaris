import type {ReplacementMaps} from '../react-update-component-prop/transform';

type ComponentFromProp = string;

export interface ComponentReplacementOptions {
  [componentName: string]: ComponentFromProp[];
}

type ReplacementMapToValue = string;

interface ReplacementMap {
  [fromValue: string]: ReplacementMapToValue;
}

export function getReplacementMaps(
  componentReplacementOptions: ComponentReplacementOptions,
  replacementMap: ReplacementMap,
): ReplacementMaps {
  return Object.fromEntries(
    Object.entries(componentReplacementOptions).map(
      ([componentName, fromProps]) => [
        componentName,
        fromProps.flatMap((fromProp) =>
          Object.entries(replacementMap).map(([fromValue, toValue]) => ({
            fromProp,
            fromValue,
            toValue,
          })),
        ),
      ],
    ),
  );
}
