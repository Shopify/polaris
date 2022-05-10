import React, {useContext, useEffect, useRef} from 'react';
import { InContextLearningContext } from './InContextLearningContext';

interface Props {
  children?:React.ReactNode;
  direction?:
    | 'top-left'
    | 'top-right'
    | 'right-top'
    | 'right-bottom'
    | 'bottom-right'
    | 'bottom-left'
    | 'left-top'
    | 'left-bottom'
    | 'none';
  stepIndex: Number;
}

export function Step({
  children,
  direction,
  stepIndex
}: Props) {
  const stepRef = useRef(null);
  const {registerStep} = useContext(InContextLearningContext); 
  
  useEffect(() => {
    registerStep(stepIndex, direction, stepRef.current);
  }, []);

  return (
    <span ref={stepRef}>
      {children}
    </span>
  );
}
