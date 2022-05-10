import React, {useEffect, useRef, useState} from 'react';

import {CancelSmallMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {Button} from '../Button';
import {Step} from './components';

import {KeypressListener} from '../KeypressListener';
import {Key} from '../../types';

interface InContextLearningStep {
  selector: string;
  content: React.ReactNode;
}

interface Position {
  top: number;
  left: number;
}

interface Props {
  steps: InContextLearningStep[];
  children?: React.ReactElement[];
  onDismiss(): void;
}

export function InContextLearning({children, steps, onDismiss}: Props) {
  const i18n = useI18n();
  const hasMultipleSteps = steps.length > 0;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const wrapperRef = useRef<HTMLInputElement>(null);
  const wrapperRefHeight = wrapperRef.current?.getBoundingClientRect().height;

  useEffect(() => {
    setCurrentPosition(updatePosition(steps[currentStep], wrapperRefHeight));
  }, [currentStep, steps]);

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
      <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
      {dismissButton}
      {steps[currentStep].content}
      {showPrev && <Button onClick={handlePrev}>Prev</Button>}
      {showNext && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
}

function updatePosition(step: InContextLearningStep, wrapperHeight?: number) {
  const {selector} = step;
  const offsetHeight = wrapperHeight ? wrapperHeight / 2 : 0;
  const domElement = document.querySelector(selector);
  if (!domElement) {
    return {top: 0 + offsetHeight, left: 0};
  }
  const rect = domElement.getBoundingClientRect();
  return {top: rect.top + offsetHeight, left: rect.left};
}

InContextLearning.Step = Step;
