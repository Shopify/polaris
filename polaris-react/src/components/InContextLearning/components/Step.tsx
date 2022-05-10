import React, {useContext, useEffect, useRef} from 'react';
import { InContextLearningContext } from './InContextLearningContext';

interface Props {
  children?:React.ReactNode;
  stepIndex: Number;
}

export function Step({
  children,
  stepIndex
}: Props) {
  const stepRef = useRef(null);
  const {setRef} = useContext(InContextLearningContext); 
  
  useEffect(() => {
    setRef(stepIndex, stepRef.current);
  }, []);

  return (
    <div ref={stepRef}>
      {children}
    </div>
  );
}
