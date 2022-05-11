import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../Button';
import {InContextLearning} from '../InContextLearning';
import {InContextLearningContextProvider} from '../components/InContextLearningContext';

describe('<InContextLearning />', () => {
  const stepOneContent = 'Step one content';
  const stepTwoContent = 'Step two content';
  const stepThreeContent = 'Step three content';

  const tutorialOneContent = 'Tutorial one content';
  const tutorialTwoContent = 'Tutorial two content';
  const tutorialThreeContent = 'Tutorial three content';

  const StepOneComponent = () => <div>{tutorialOneContent}</div>;
  const StepTwoComponent = () => <div>{tutorialTwoContent}</div>;
  const StepThreeComponent = () => <div>{tutorialThreeContent}</div>;

  it('renders and registers all steps and can reverse through them', async () => {
    const onDismiss = jest.fn();

    const subject = mountWithApp(
      <InContextLearningContextProvider stepComponents={[
        <StepOneComponent/>,
        <StepTwoComponent/>,
        <StepThreeComponent/>
      ]}>
        <InContextLearning.Step stepIndex={0}>
          <div>{stepOneContent}</div>
        </InContextLearning.Step>
        <InContextLearning.Step stepIndex={1}>
          <div>{stepTwoContent}</div>
        </InContextLearning.Step>
        <InContextLearning.Step stepIndex={2}>
          <div>{stepThreeContent}</div>
        </InContextLearning.Step>
        <InContextLearning onDismiss={onDismiss}/>
      </InContextLearningContextProvider>
    );

    let closeButton;
    let nextButton;
    let prevButton;

    // Check that we have our child steps
    expect(subject).toContainReactText(stepOneContent);
    expect(subject).toContainReactText(stepTwoContent);
    expect(subject).toContainReactText(stepThreeContent);

    // Start at Step 1
    expect(subject).toContainReactComponent(StepOneComponent);
    expect(subject).not.toContainReactComponent(StepTwoComponent);
    expect(subject).not.toContainReactComponent(StepThreeComponent);

    // Progress to Step 2
    nextButton = subject.findAll(Button)[1];
    nextButton.trigger('onClick');
    expect(subject).not.toContainReactComponent(StepOneComponent);
    expect(subject).toContainReactComponent(StepTwoComponent);
    expect(subject).not.toContainReactComponent(StepThreeComponent);

    // Progress to Step 3
    nextButton = subject.findAll(Button)[2];
    nextButton.trigger('onClick');
    expect(subject).not.toContainReactComponent(StepOneComponent);
    expect(subject).not.toContainReactComponent(StepTwoComponent);
    expect(subject).toContainReactComponent(StepThreeComponent);

    // Regress to Step 2
    prevButton = subject.findAll(Button)[1];
    prevButton.trigger('onClick');
    expect(subject).not.toContainReactComponent(StepOneComponent);
    expect(subject).toContainReactComponent(StepTwoComponent);
    expect(subject).not.toContainReactComponent(StepThreeComponent);

    // Regress to Step 1
    prevButton = subject.findAll(Button)[1];
    prevButton.trigger('onClick');
    expect(subject).toContainReactComponent(StepOneComponent);
    expect(subject).not.toContainReactComponent(StepTwoComponent);
    expect(subject).not.toContainReactComponent(StepThreeComponent);

    // Close and dismiss
    closeButton = subject.findAll(Button)[0];
    closeButton.trigger('onClick');
    expect(onDismiss).toBeCalledTimes(1);
  });

  it('closes with the Got it button', async () => {
    const onDismiss = jest.fn();

    const subject = mountWithApp(
      <InContextLearningContextProvider stepComponents={[
        <StepOneComponent/>,
        <StepTwoComponent/>,
        <StepThreeComponent/>
      ]}>
        <InContextLearning.Step stepIndex={0}>
          <div>{stepOneContent}</div>
        </InContextLearning.Step>
        <InContextLearning.Step stepIndex={1}>
          <div>{stepTwoContent}</div>
        </InContextLearning.Step>
        <InContextLearning.Step stepIndex={2}>
          <div>{stepThreeContent}</div>
        </InContextLearning.Step>
        <InContextLearning onDismiss={onDismiss}/>
      </InContextLearningContextProvider>
    );

    const nextButton = subject.findAll(Button)[1];
    nextButton.trigger('onClick');
    nextButton.trigger('onClick');

    const gotItButton = subject.findAll(Button)[2];
    gotItButton.trigger('onClick');
    
    expect(onDismiss).toBeCalledTimes(1);
  });
});
