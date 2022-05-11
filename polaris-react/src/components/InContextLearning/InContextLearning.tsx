import React, {useContext, useEffect, useState} from 'react';

import {MobileCancelMajor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {Button} from '../Button';
import {InContextLearningContext} from './components';
import {Portal} from '../Portal';
import {PositionedOverlay} from '../PositionedOverlay';
import {KeypressListener} from '../KeypressListener';
import {Key} from '../../types';
import {TextStyle} from '../TextStyle';
import {Stack} from '../Stack';
import {Step} from './components';
import {classNames} from '../../utilities/css';

import styles from './InContextLearning.scss';

interface Props {
  onDismiss?(): void;
}

export function InContextLearning({onDismiss}: Props) {
  const i18n = useI18n();
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentActivator, setCurrentActivator] = useState<HTMLElement | null>(
    null,
  );

  const {steps} = useContext(InContextLearningContext);
  const {title, component, ref: currentStepRef, direction} = steps[currentStep];

  const totalSteps = steps.length;
  const hasMultipleSteps = totalSteps > 1;

  useEffect(() => {
    setCurrentActivator(currentStepRef ?? null);
  }, [currentStep, steps]);

  const showBack = hasMultipleSteps && currentStep > 0;
  const showNext = hasMultipleSteps && currentStep + 1 < totalSteps;
  const showClose = !showNext;

  const handleDismiss = () => {
    onDismiss?.();
    setVisible(false);
  };
  const handleNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
    console.warn('Next clicked');
  };

  const handleBack = () => {
    setCurrentStep((currentStep) => currentStep - 1);
    console.warn('Back clicked');
  };

  const handleClose = () => {
    console.warn('Close popover');
    handleDismiss;
  };

  const dismissButton = (
    <div>
      <Button
        plain
        icon={MobileCancelMajor}
        onClick={handleDismiss}
        accessibilityLabel={i18n.translate(
          'Polaris.InContextLearning.accessibilityLabel',
        )}
      />
    </div>
  );
  const showArrow = direction != 'none';

  if (!currentActivator || !visible) {
    return null;
  }

  return (
    <Portal>
      <PositionedOverlay
        active={true}
        activator={currentActivator}
        render={() => {
          return (
            <>
              <div
                className={classNames(
                  styles.InContextLearningWrapper,
                  showArrow && styles.withArrow,
                )}
              >
                <KeypressListener
                  keyCode={Key.Escape}
                  handler={handleDismiss}
                />
                <Stack vertical spacing="baseTight">
                  <div className={styles['InContextLearning-header']}>
                    <TextStyle variation="strong">{title}</TextStyle>
                    {dismissButton}
                  </div>
                  {component}
                  <Stack
                    alignment="center"
                    wrap={false}
                    distribution="fillEvenly"
                  >
                    <Stack.Item>
                      {hasMultipleSteps && (
                        <TextStyle variation="subdued">
                          {currentStep + 1} of {totalSteps}
                        </TextStyle>
                      )}
                    </Stack.Item>
                    <Stack.Item>
                      <Stack
                        alignment="center"
                        wrap={false}
                        spacing="tight"
                        distribution="trailing"
                      >
                        {showBack && <Button onClick={handleBack}>Back</Button>}
                        {showNext && (
                          <Button primary onClick={handleNext}>
                            Next
                          </Button>
                        )}
                        {showClose && (
                          <Button primary onClick={handleClose}>
                            Got it
                          </Button>
                        )}
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack>
              </div>
            </>
          );
        }}
      />
    </Portal>
  );
}

InContextLearning.Step = Step;
