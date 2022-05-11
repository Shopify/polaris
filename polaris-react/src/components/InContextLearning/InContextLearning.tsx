import React, {useContext, useEffect, useState} from 'react';

import {useI18n} from '../../utilities/i18n';
import {Header, InContextLearningContext} from './components';
import {Portal} from '../Portal';
import {PositionedOverlay} from '../PositionedOverlay';
import {KeypressListener} from '../KeypressListener';
import {Key} from '../../types';
import {TextStyle} from '../TextStyle';
import {Stack} from '../Stack';
import {Step} from './components';
import styles from './InContextLearning.scss';
import {Button} from '../Button';
interface Props {
  onDismiss(): void;
  title?: string;
}

export function InContextLearning({onDismiss, title}: Props) {
  const i18n = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentActivator, setCurrentActivator] = useState<HTMLElement | null>(
    null,
  );

  const {steps} = useContext(InContextLearningContext);

  const totalSteps = steps.length;
  const hasMultipleSteps = totalSteps > 1;

  useEffect(() => {
    setCurrentActivator(steps[currentStep].ref ?? null);
  }, [currentStep, steps]);

  const showBack = hasMultipleSteps && currentStep > 0;
  const showNext = hasMultipleSteps && currentStep + 1 < totalSteps;
  const showClose = !showNext;

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
    onDismiss?.();
  };

  const showArrow = steps[currentStep].direction != 'none';

  const counterMarkup = hasMultipleSteps ? (
    <p style={{textAlign: 'center'}}>
      {currentStep + 1}
      <TextStyle variation="subdued">/{totalSteps}</TextStyle>
    </p>
  ) : null;

  if (!currentActivator) {
    return null;
  }

  return (
    <Portal>
      <PositionedOverlay
        active={true}
        activator={currentActivator}
        render={(state) => {
          const isAbove = state.positioning === 'above';
          const horizontalMargin = {marginLeft: '.5rem', marginRight: '0.5rem'};
          const verticalMargin = isAbove
            ? {marginBottom: '.75rem'}
            : {marginTop: '.75rem'};
          const arrowStyles = isAbove
            ? {bottom: '-1rem', borderColor: '#fff transparent transparent'}
            : {top: '-1rem', borderColor: 'transparent transparent #fff'};

          return (
            <>
              <div
                className={styles.InContextLearning}
                style={{
                  ...horizontalMargin,
                  ...verticalMargin,
                }}
              >
                <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
                <Header title={title} onDismiss={onDismiss} />
                <div className={styles.TutorialContent}>
                  {steps[currentStep].component}
                </div>
                <div className={styles.TutorialFooter}>
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
                </div>
              </div>
              {showArrow && (
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(25% - 1rem)',
                    borderWidth: '.5rem',
                    borderStyle: 'solid',
                    ...verticalMargin,
                    ...arrowStyles,
                  }}
                />
              )}
            </>
          );
        }}
      />
    </Portal>
  );
}

InContextLearning.Step = Step;
