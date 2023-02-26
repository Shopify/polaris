import * as polaris from '@shopify/polaris';
import {ComponentMap, PropDefinition, PropType} from './types';
import untypedComponents from './data/componentProps.json';
import {createElement} from 'react';

interface PropMap {
  [reactPropsName: string]: {
    [prop: string]: PropDefinition;
  };
}

// @ts-ignore
let importedProps = untypedComponents as PropMap;

export let components: ComponentMap = {};

Object.entries(importedProps).forEach(([reactPropsName, props]) => {
  const componentName = reactPropsName.replace('Props', '');

  const polarisReactComponent = polaris[componentName as keyof typeof polaris];
  if (componentName.includes('.')) {
    const parts = componentName.split('.');
    // @ts-ignore
    const polarisReactComponent = polaris[parts[0]][parts[1]];
    if (polarisReactComponent) {
      components[componentName] = {
        reactComponent: polarisReactComponent,
        description: 'My awesome component',
        renderPreview: () =>
          createElement('div', {}, [`${componentName} preview`]),
        props,
      };
    }
  } else if (!polarisReactComponent) {
    delete components[componentName];
  } else {
    components[componentName] = {
      reactComponent: polarisReactComponent,
      description: 'My awesome component',
      renderPreview: () =>
        createElement('div', {}, [`${componentName} preview`]),
      props,
    };
  }
});

components['p'] = {
  reactComponent: (props: any) => createElement('p', props),
  description: '',
  props: {
    children: {
      type: PropType.String,
      description: 'The content of the paragraph',
      isArrayed: false,
      isRequired: true,
      defaultValue: {
        type: PropType.String,
        value: ['Lorem ipsum dolor et amet'],
      },
    },
  },
  renderPreview: () => <p>Paragraph</p>,
};
