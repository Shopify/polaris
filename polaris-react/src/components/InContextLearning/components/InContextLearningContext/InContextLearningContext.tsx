import React, {useState} from 'react';

export interface InContextLearningContextProviderStepType {
  component: React.ReactNode;
  ref: HTMLElement | null;
}

export interface InContextLearningContextProviderPropsType {
  children?: React.ReactNode;
  stepComponents: React.ReactNode[];
}

export type registerStepType = (
  stepIndex: number,
  ref: HTMLElement | null,
) => void;

export interface InContextLearningContextType {
  registerStep: registerStepType;
  steps: InContextLearningContextProviderStepType[];
}

export const InContextLearningContext =
  React.createContext<InContextLearningContextType>({
    registerStep: () => {},
    steps: [],
  });

export function InContextLearningContextProvider({
  children,
  stepComponents,
}: InContextLearningContextProviderPropsType) {
  const [steps, setSteps] = useState(
    stepComponents.map(
      (component): InContextLearningContextProviderStepType => ({
        component,
        ref: null,
      }),
    ),
  );

  const registerStep: registerStepType = (stepIndex, ref) => {
    steps[stepIndex] = {
      ...steps[stepIndex],
      ref,
    };

    setSteps([...steps]);
  };

  return (
    <InContextLearningContext.Provider value={{registerStep, steps}}>
      {children}
    </InContextLearningContext.Provider>
  );
}
