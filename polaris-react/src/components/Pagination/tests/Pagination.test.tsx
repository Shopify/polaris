import React from 'react';
import {mountWithApp} from 'tests/utilities';
import type {CustomRoot} from '@shopify/react-testing';

import {Key} from '../../../types';
import {Pagination} from '../Pagination';
import {Button} from '../../Button';
import {ButtonGroup} from '../../ButtonGroup';
import {TextField} from '../../TextField';
import {Text} from '../../Text';
import {Tooltip} from '../../Tooltip';
import en from '../../../../locales/en.json';

interface HandlerMap {
  [eventName: string]: (event: any) => void;
}

jest.mock('../../Portal', () => ({
  ...(jest.requireActual('../../Portal') as any),
  Portal() {
    return null;
  },
}));

const listenerMap: HandlerMap = {};

describe('<Pagination />', () => {
  let addEventListener: jest.SpyInstance;
  let removeEventListener: jest.SpyInstance;

  beforeEach(() => {
    addEventListener = jest.spyOn(document, 'addEventListener');
    addEventListener.mockImplementation((event, callback) => {
      listenerMap[event] = callback;
    });

    removeEventListener = jest.spyOn(document, 'removeEventListener');
    removeEventListener.mockImplementation((event) => {
      listenerMap[event] = noop;
    });
  });

  afterEach(() => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  describe('tooltip', () => {
    it('renders a tooltip if nextTooltip is provided and hasNext is true', () => {
      const pagination = mountWithApp(<Pagination nextTooltip="k" hasNext />);
      expect(pagination).toContainReactComponent(Tooltip, {
        content: 'k',
      });
    });

    it('does not render a tooltip if nextTooltip is provided and hasNext is false', () => {
      const pagination = mountWithApp(
        <Pagination nextTooltip="k" hasNext={false} />,
      );
      expect(pagination).not.toContainReactComponent(Tooltip);
    });

    it('renders a tooltip if previousToolTip is provided and hasPrevious is true', () => {
      const pagination = mountWithApp(
        <Pagination previousTooltip="j" hasPrevious />,
      );
      expect(pagination).toContainReactComponent(Tooltip, {
        content: 'j',
      });
    });

    it('does not render  tooltip if previousToolTip is provided and hasPrevious is false', () => {
      const pagination = mountWithApp(
        <Pagination previousTooltip="j" hasPrevious={false} />,
      );
      expect(pagination).not.toContainReactComponent(Tooltip);
    });

    it('renders a tooltip for nextToolTip and previousToolTip when they are provided and hasPrevious and hasNext are true', () => {
      const pagination = mountWithApp(
        <Pagination previousTooltip="j" nextTooltip="k" hasPrevious hasNext />,
      );

      expect(pagination).toContainReactComponentTimes(Tooltip, 2);
    });
  });

  describe('accessibilityLabel', () => {
    it('inserts prop as aria-label', () => {
      const pagination = mountWithApp(<Pagination accessibilityLabel="test" />);
      expect(pagination).toContainReactComponent('nav', {'aria-label': 'test'});
    });

    it('uses default value for aria-label', () => {
      const pagination = mountWithApp(<Pagination />);

      expect(pagination).toContainReactComponent('nav', {
        'aria-label': 'Pagination',
      });
    });
  });

  describe('accessibilityLabels', () => {
    const defaultProps = {
      accessibilityLabels: {
        previous: 'Previous orders page',
        next: 'Next orders page',
      },
    };

    it('passes accessibilityLabels to Button', () => {
      const pagination = mountWithApp(
        <Pagination {...defaultProps} previousURL="prev" nextURL="next" />,
      );

      expect(pagination).toContainReactComponent(Button, {
        accessibilityLabel: defaultProps.accessibilityLabels.previous,
      });

      expect(pagination).toContainReactComponent(Button, {
        accessibilityLabel: defaultProps.accessibilityLabels.next,
      });
    });

    it('renders default accessibilityLabels on Button', () => {
      const pagination = mountWithApp(
        <Pagination previousURL="prev" nextURL="next" />,
      );

      expect(pagination).toContainReactComponent(Button, {
        accessibilityLabel: en.Polaris.Pagination.previous,
      });

      expect(pagination).toContainReactComponent(Button, {
        accessibilityLabel: en.Polaris.Pagination.next,
      });
    });
  });

  describe('label', () => {
    it('renders as text', () => {
      const pagination = mountWithApp(<Pagination label="test" />);
      expect(pagination.text()).toContain('test');
    });

    it('has subdued text without next and previous pages', () => {
      const pagination = mountWithApp(<Pagination label="test" />);

      expect(pagination).toContainReactComponent(Text, {
        color: 'subdued',
      });
    });
  });

  it('adds a keypress event for nextKeys', () => {
    const spy = jest.fn();
    mountWithApp(
      <Pagination hasNext nextKeys={[Key.KeyK]} onNext={spy} nextTooltip="k" />,
    );

    listenerMap.keyup({keyCode: Key.KeyK});

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('adds a keypress event for previousKeys', () => {
    const spy = jest.fn();
    mountWithApp(
      <Pagination
        hasPrevious
        previousKeys={[Key.KeyJ]}
        onPrevious={spy}
        previousTooltip="j"
      />,
    );

    listenerMap.keyup({keyCode: Key.KeyJ});

    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('input elements', () => {
    it('will not call paginations callback on keypress if a input element is focused', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <div>
          <TextField label="test" value="" onChange={noop} autoComplete="off" />
          <Pagination
            nextTooltip="j"
            previousKeys={[Key.KeyJ]}
            onPrevious={spy}
            previousTooltip="j"
          />
        </div>,
      );
      focusElement(wrapper, 'input');
      listenerMap.keyup({keyCode: Key.KeyJ});
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('nextURL/previousURL', () => {
    let pagination: CustomRoot<any, any>;

    it('navigates the browser to the anchors target when the designated key is pressed', () => {
      const spy = jest.fn();
      pagination = mountWithApp(
        <Pagination
          hasPrevious
          previousKeys={[Key.KeyJ]}
          previousTooltip="j"
          previousURL="https://www.google.com"
        />,
      );
      const anchor = pagination.find('a')!.domNode as HTMLAnchorElement;
      anchor.click = spy;
      listenerMap.keyup({keyCode: Key.KeyJ});

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not navigate the browser when hasNext or hasPrevious is false', () => {
      const anchorClickSpy = jest.fn();
      pagination = mountWithApp(
        <Pagination
          hasPrevious={false}
          previousKeys={[Key.KeyJ]}
          previousTooltip="j"
          previousURL="https://www.google.com"
        />,
      );

      const anchor = pagination.find('a')!.domNode as HTMLAnchorElement;
      anchor.click = anchorClickSpy;
      listenerMap.keyup({keyCode: Key.KeyJ});

      expect(anchorClickSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('uses Button and ButtonGroup as subcomponents', () => {
    const pagination = mountWithApp(
      <Pagination nextURL="/next" previousURL="/prev" />,
    );

    expect(pagination).toContainReactComponent(ButtonGroup, {
      segmented: true,
    });
    expect(pagination).toContainReactComponent(Button, {url: '/prev'});
    expect(pagination).toContainReactComponent(Button, {url: '/next'});
  });

  it('the ButtonGroup is not segmented when there is a label', () => {
    const pagination = mountWithApp(
      <Pagination nextURL="/next" previousURL="/prev" label="Hello, world!" />,
    );

    expect(pagination).toContainReactComponent(ButtonGroup, {
      segmented: false,
    });
  });
});

function noop() {}

function focusElement(
  wrapper: CustomRoot<any, any>,
  element: 'input' | 'textarea' | 'select',
) {
  const inputElement = wrapper.findAll(element)[0].domNode as HTMLInputElement;

  inputElement.focus();
}
