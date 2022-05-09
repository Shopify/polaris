import React, {useState} from 'react';

import {Step} from './components';
import {Button} from '../Button';

interface Props {
    children: React.ReactElement[];
}

export function InContextLearning({children}: Props) {
    const hasMultipleSteps = children.length > 0;
    const [currentStep, setCurrentStep] = useState(0);

    const showPrev = hasMultipleSteps && currentStep > 0;
    const showNext = hasMultipleSteps && currentStep < (children.length - 1);

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
            {children[currentStep]}

            {showPrev && <Button onClick={handlePrev}>Prev</Button>}
            {showNext && <Button onClick={handleNext}>Next</Button>}
        </>
    );
}

InContextLearning.Step = Step;
