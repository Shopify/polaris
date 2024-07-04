import React from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import type {CustomRoot} from 'tests/utilities';
import {mountWithApp} from 'tests/utilities';
import {act} from 'react-dom/test-utils';

import {KeypressListener} from '../../../../KeypressListener';
import {Text} from '../../../../Text';
import {Dialog} from '../Dialog';
import {Key} from '../../../../../types';

describe('<Dialog>', () => {
  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('sets CloseKeypressListener when `in` is true', () => {
    const listener = mountWithApp(
      <Dialog labelledBy="test" onClose={noop} in>
        something
      </Dialog>,
    );

    expect(listener).toContainReactComponent(KeypressListener);
  });

  it('triggers an onEntered prop', () => {
    const spy = jest.fn();

    const dialog = mountWithApp(
      <Dialog labelledBy="test" onClose={noop} onEntered={spy}>
        something
      </Dialog>,
    );

    dialog.triggerKeypath('onEntered');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders any toast messages passed from the frame context within the Dialog', () => {
    const toastMessages = [
      {id: 'toast-1', content: 'Toast 1', onDismiss: noop},
      {id: 'toast-2', content: 'Toast 2', onDismiss: noop},
    ];
    const dialog = mountWithApp(
      <Dialog labelledBy="test" onClose={noop} in>
        something
      </Dialog>,
      {
        frame: {
          toastMessages,
        },
      },
    );
    toastMessages.forEach((toastMessage) => {
      expect(dialog).toContainReactComponent(Text, {
        children: toastMessage.content,
      });
    });
  });

  it('sets closing true when the dialog is focused and enter fires keydown', () => {
    const setClosingSpy = jest.fn();
    const dialog = mountWithApp(
      <Dialog onClose={noop} setClosing={setClosingSpy} in>
        something
      </Dialog>,
    );

    triggerKeyboardEvent(dialog, 'keydown', Key.Enter);

    expect(setClosingSpy).toHaveBeenCalledWith(true);
  });

  it('closes the dialog on enter keyup and dialog is focused', () => {
    const setClosingSpy = jest.fn();
    const onCloseSpy = jest.fn();
    const dialog = mountWithApp(
      <Dialog onClose={onCloseSpy} setClosing={setClosingSpy} in>
        something
      </Dialog>,
    );

    triggerKeyboardEvent(dialog, 'keyup', Key.Enter);

    expect(setClosingSpy).toHaveBeenCalledWith(false);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}

function triggerKeyboardEvent(
  dialog: CustomRoot<unknown, object>,
  event: keyof WindowEventMap,
  keyCode: Key,
) {
  act(() => {
    const target = dialog.find('div', {role: 'dialog'})!.domNode!;

    target.dispatchEvent(new KeyboardEvent(event, {keyCode, bubbles: true}));
  });
}
