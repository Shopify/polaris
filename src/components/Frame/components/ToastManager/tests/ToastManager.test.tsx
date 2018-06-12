import * as React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import {noop} from '../../../../../utilities/other';
import Toast, {Props} from '../../Toast';
import Frame from '../../../Frame';
import TextContainer from '../../../../TextContainer';

describe('<Toast />', () => {
  const mockProps: Props = {onDismiss: noop};

  it('renders multiple toasts', () => {
    const message1 = mountWithAppProvider(
      <Frame>
        <Toast {...mockProps}>
          <TextContainer>
            <p>Toast 1</p>
          </TextContainer>
        </Toast>
      </Frame>,
    );
    const message2 = mountWithAppProvider(
      <Frame>
        <Toast {...mockProps}>
          <TextContainer>
            <span>Toast 2</span>
          </TextContainer>
        </Toast>
      </Frame>,
    );

    expect(
      message1
        .find(TextContainer)
        .find('p')
        .exists(),
    ).toBe(true);
    expect(
      message2
        .find(TextContainer)
        .find('span')
        .exists(),
    ).toBe(true);
  });
});

describe('onDismiss()', () => {
  const mockProps: Props = {onDismiss: noop};

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  it('is called twice with different durations', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const duration1 = 5000;
    const duration2 = 10000;

    mountWithAppProvider(
      <Frame>
        <Toast {...mockProps} onDismiss={spy1} duration={duration1} />
      </Frame>,
    );
    mountWithAppProvider(
      <Frame>
        <Toast {...mockProps} onDismiss={spy2} duration={duration2} />
      </Frame>,
    );

    timer.runTimersToTime(duration1);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();
    timer.runTimersToTime(duration2);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});
