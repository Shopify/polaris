import React, { useState } from 'react';

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
  component: React.ReactNode;
  direction?: DirectionType,
  ref:HTMLElement | null;
}

export interface InContextLearningContextProviderPropsType {
  children?: React.ReactNode;
  stepComponents: React.ReactNode[];
}

export type registerStepType = (stepIndex: number, ref: HTMLElement | null, direction?: DirectionType) => void;

export interface InContextLearningContextType {
  registerStep: registerStepType;
  steps: InContextLearningContextProviderStepType[];
}

export const InContextLearningContext = React.createContext<InContextLearningContextType>({
  registerStep: ()=> {},
  steps: [],
});

export function InContextLearningContextProvider({
  children,
  stepComponents
}: InContextLearningContextProviderPropsType) {
  const [steps, setSteps] = useState(stepComponents.map((component):InContextLearningContextProviderStepType => ({ component, ref: null })));

  const registerStep:registerStepType = (stepIndex, ref, direction) => {
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
