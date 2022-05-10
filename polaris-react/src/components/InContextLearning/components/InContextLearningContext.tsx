import React, { useState } from 'react';

export const InContextLearningContext = React.createContext({
  setRef: ()=> {},
  steps: [],
});

export interface InContextLearningContextProviderPropsType {
  children?: React.ReactNode;
  stepComponents: React.FunctionComponent[];
}

export interface InContextLearningContextProviderStepType {
  component: React.FunctionComponent[];
  ref?:HTMLElement;
}

export function InContextLearningContextProvider({
  children,
  stepComponents
}: InContextLearningContextProviderPropsType) {
  const [steps, setSteps] = useState(stepComponents.map(component => ({ component })));

  const setRef = (stepIndex: number, ref: HTMLElement):void => {
    const newSteps:InContextLearningContextProviderStepType[] = steps.map(step => ({ ...step }));
    newSteps[stepIndex].ref = ref;
    setSteps(newSteps);
  };

  const contextModel = {setRef, steps};

  return (
    <InContextLearningContext.Provider value={contextModel}>
      {children}
    </InContextLearningContext.Provider>
  );
}
