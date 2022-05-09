import React, {useState} from 'react';
import styles from './InContextLearning.scss';
import {Header, Step} from "./components"
import {Button} from '../Button';
import styles from './InContextLearning.scss';

interface Props {
    children?: React.ReactElement[];
}

export function InContextLearning({children}: Props) {
    const hasMultipleSteps = children ? children.length > 0 : false;
    const [currentStep, setCurrentStep] = useState(0);

    const showPrev = hasMultipleSteps && currentStep > 0;
    const showNext = hasMultipleSteps && currentStep < (children ? children.length - 1 : false);

    const handleNext = () => {
        setCurrentStep((currentStep) => currentStep + 1)
        console.warn('Next clicked');
    }

    const handlePrev = () => {
        setCurrentStep((currentStep) => currentStep - 1)
        console.warn('Prev clicked');
    }

    return (
        <>
          {children && children[currentStep]}
          <div className={styles.InContextLearning}>
            <div>
              <Header onClose={() => {}}>Placeholder title</Header>
            </div>
          </div>
          {showPrev && <Button onClick={handlePrev}>Prev</Button>}
          {showNext && <Button onClick={handleNext}>Next</Button>}
        </>
    );
}

InContextLearning.Step = Step;
