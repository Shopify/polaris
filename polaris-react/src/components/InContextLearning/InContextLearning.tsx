import React, {useState} from 'react';

import {CancelSmallMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {Button} from '../Button';
import {Step} from './components';

interface Props {
  children: React.ReactElement[];
  onDismiss(): void;
}

export function InContextLearning({children, onDismiss}: Props) {
  const i18n = useI18n();

  const hasMultipleSteps = children.length > 0;
  const [currentStep, setCurrentStep] = useState(0);

  const showPrev = hasMultipleSteps && currentStep > 0;
  const showNext = hasMultipleSteps && currentStep < children.length - 1;

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
    <>
      {dismissButton}
      {children[currentStep]}

      {showPrev && <Button onClick={handlePrev}>Prev</Button>}
      {showNext && <Button onClick={handleNext}>Next</Button>}
    </>
  );
}

InContextLearning.Step = Step;
