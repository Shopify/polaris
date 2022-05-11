import React, {useContext, useEffect, useState} from 'react';

import {Header, InContextLearningContext} from './components';
import {Button} from '../Button';
import {KeypressListener} from '../KeypressListener';
import {Portal} from '../Portal';
import {PositionedOverlay} from '../PositionedOverlay';
import {Stack} from '../Stack';
import {TextStyle} from '../TextStyle';
import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {Key} from '../../types';
import {Step} from './components';
import styles from './InContextLearning.scss';
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
  };

  const handleBack = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const handleClose = () => {
    onDismiss?.();
  };

  if (!currentActivator) {
    return null;
  }

  return (
    <Portal>
      <PositionedOverlay
        active={true}
        activator={currentActivator}
        render={(state) => {
          const containerClassName = classNames(
            styles.InContextLearning,
            state.positioning === 'above' ? styles.above : styles.below,
          );
          const arrowClassName = classNames(
            styles.Arrow,
            state.positioning === 'above' ? styles.above : styles.below,
          );

          return (
            <>
              <div className={containerClassName}>
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
                          {i18n.translate(
                            'Polaris.InContextLearning.multipleSteps',
                            {currentStep: currentStep + 1, totalSteps},
                          )}
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
                        {showBack && (
                          <Button onClick={handleBack}>
                            {i18n.translate('Polaris.Common.back')}
                          </Button>
                        )}
                        {showNext && (
                          <Button primary onClick={handleNext}>
                            {i18n.translate('Polaris.Common.next')}
                          </Button>
                        )}
                        {showClose && (
                          <Button primary onClick={handleClose}>
                            {i18n.translate('Polaris.InContextLearning.gotIt')}
                          </Button>
                        )}
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </div>
              </div>
              <div className={arrowClassName} />
            </>
          );
        }}
      />
    </Portal>
  );
}

InContextLearning.Step = Step;
