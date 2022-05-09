import React, {useEffect, useRef, useState} from 'react';

import {CancelSmallMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {Button} from '../Button';
import {Step} from './components';
import {styles} from '../CustomProperties/styles';

interface InContextLearningStep {
  className: string;
  content: React.ReactNode;
}

interface Position {
  top: number;
  left: number;
}

interface Props {
  children?: React.ReactElement[];
  steps: InContextLearningStep[];
  onDismiss(): void;
}

export function InContextLearning({children, steps, onDismiss}: Props) {
  const i18n = useI18n();
  const hasMultipleSteps = steps.length > 0;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setCurrentPosition(updatePosition(steps[currentStep]));
  }, []);

  const showPrev = hasMultipleSteps && currentStep > 0;
  const showNext = hasMultipleSteps && currentStep < steps.length - 1;

  const handleNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
    console.warn('Next clicked');
  };

  const handlePrev = () => {
    setCurrentStep((currentStep) => currentStep - 1);
    console.warn('Prev clicked');
  };

  const dismissButton = (
    <div>
      <Button
        plain
        icon={CancelSmallMinor}
        onClick={onDismiss}
        accessibilityLabel={i18n.translate(
          'Polaris.InContextLearning.accessibilityLabel',
        )}
      />
    </div>
  );

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const {height} = wrapperRef.current.getBoundingClientRect();
    setCurrentPosition(updatePosition(steps[currentStep], height));
  }, [currentStep, steps]);

  return (
    <div
      style={{
        top: `${currentPosition?.top}px`,
        left: `${currentPosition?.left}px,`,
        position: 'absolute',
        padding: '1em',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
      }}
      ref={wrapperRef}
    >
      {dismissButton}
      {steps[currentStep].content}
      {showPrev && <Button onClick={handlePrev}>Prev</Button>}
      {showNext && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
}

function updatePosition(step: InContextLearningStep, wrapperHeight: number) {
  const {className} = step;
  const offsetHeight = wrapperHeight / 2;
  const domElement = document.querySelector(className);
  if (!domElement) {
    return {top: 0 + offsetHeight, left: 0};
  }
  const rect = domElement.getBoundingClientRect();
  return {top: rect.top + offsetHeight, left: rect.left};
}

InContextLearning.Step = Step;
