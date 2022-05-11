import React, {useContext, useEffect, useRef} from 'react';
import {InContextLearningContext} from './InContextLearningContext';

interface Props {
  children?: React.ReactNode;
  stepIndex: number;
}

export function Step({children, stepIndex}: Props) {
  const stepRef = useRef(null);
  const {registerStep} = useContext(InContextLearningContext);

  useEffect(() => {
    registerStep(stepIndex, stepRef.current);
  }, []);

  return <span ref={stepRef}>{children}</span>;
}
