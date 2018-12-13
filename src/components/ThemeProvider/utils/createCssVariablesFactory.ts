import {constructColorName} from '../../../utilities/color-names';

export interface CssVariables {
  [key: string]: string;
}

export default function createCssVariableFactory<V>(
  componentName: string,
  defaultValues: V,
) {
  return (values?: V): CssVariables => {
    const mergedValues: V = {...defaultValues, ...values};
    return Object.entries(mergedValues)
      .map(([variableProperty, value]) => [
        constructColorName(componentName, variableProperty),
        value,
      ])
      .reduce(
        (currentVariables, [variableName, value]) => ({
          ...currentVariables,
          [variableName]: value,
        }),
        {},
      );
  };
}
