import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {InContextLearningContextProvider} from '../../InContextLearningContext';
import {Step} from '../Step';

describe('<Step />', () => {
  it('renders and registers a step', () => {
    const content = 'Test content';

    const StepComponent = () => <div></div>;

    const subject = mountWithApp(
      <InContextLearningContextProvider stepComponents={[<StepComponent/>]}>
        <Step stepIndex={0}>
          <div>{content}</div>
        </Step>
      </InContextLearningContextProvider>
    );

    expect(subject).toContainReactText(content);
  });
});
