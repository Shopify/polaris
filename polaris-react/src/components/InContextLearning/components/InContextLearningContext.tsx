import React, { useState } from 'react';

export const InContextLearningContext = React.createContext({
  registerStep: ()=> {},
  steps: [],
});

export type DirectionType = 
  | 'top-left'
  | 'top-right'
  | 'right-top'
  | 'right-bottom'
  | 'bottom-right'
  | 'bottom-left'
  | 'left-top'
  | 'left-bottom'
  | 'none';

export interface InContextLearningContextProviderStepType {
  component: React.FunctionComponent[];
  direction?: DirectionType,
  ref?:HTMLElement;
}

export interface InContextLearningContextProviderPropsType {
  children?: React.ReactNode;
  stepComponents: React.ReactNode[];
}

export function InContextLearningContextProvider({
  children,
  stepComponents
}: InContextLearningContextProviderPropsType) {
  const [steps, setSteps] = useState(stepComponents.map(component => ({ component })));

  const registerStep = (stepIndex: number, direction: DirectionType, ref: HTMLElement):void => {
    steps[stepIndex] = {
      ...steps[stepIndex],
      direction,
      ref
    };
    
    setSteps([...steps]);
  };

  return (
    <InContextLearningContext.Provider value={{registerStep, steps}}>
      {children}
    </InContextLearningContext.Provider>
  );
}
