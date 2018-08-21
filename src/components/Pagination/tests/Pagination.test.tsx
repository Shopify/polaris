import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {ReactWrapper} from 'enzyme';
import {mountWithAppProvider, findByTestID} from '../../../../tests/utilities';
import {Keys} from '../../../types';
import Pagination from '../../Pagination';
import Tooltip from '../../Tooltip';

interface HandlerMap {
  [eventName: string]: (event: any) => void;
}

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
    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  it('will render a tooltip if nextTooltip is provided', () => {
    const pagination = mountWithAppProvider(<Pagination nextTooltip="k" />);
    pagination.find(Tooltip).simulate('focus');

    expect(findByTestID(pagination, 'TooltipOverlayLabel').text()).toBe('k');
  });

  it('will render a tooltip if previousToolTip is provided', () => {
    const pagination = mountWithAppProvider(<Pagination previousTooltip="j" />);
    pagination.find(Tooltip).simulate('focus');

    expect(findByTestID(pagination, 'TooltipOverlayLabel').text()).toBe('j');
  });

  it('will render a tooltip for nextToolTip and previousToolTip when they are provided', () => {
    const pagination = mountWithAppProvider(
      <Pagination previousTooltip="j" nextTooltip="k" />,
    );

    expect(pagination.find(Tooltip)).toHaveLength(2);
  });

  it('will add a keypress event for nextKeys', () => {
    const spy = jest.fn();
    mountWithAppProvider(
      <Pagination nextKeys={[Keys.KEY_K]} onNext={spy} nextTooltip="k" />,
    );

    listenerMap.keyup({keyCode: Keys.KEY_K});

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('will add a keypress event for previousKeys', () => {
    const spy = jest.fn();
    mountWithAppProvider(
      <Pagination
        previousKeys={[Keys.KEY_J]}
        onPrevious={spy}
        previousTooltip="j"
      />,
    );

    listenerMap.keyup({keyCode: Keys.KEY_J});

    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('nextURL/previousURL', () => {
    let getElementById: jest.SpyInstance;
    let pagination: ReactWrapper<any, any>;

    beforeEach(() => {
      getElementById = jest.spyOn(document, 'getElementById');
      getElementById.mockImplementation((id) => {
        return pagination
          .find(`#${id}`)
          .at(0)
          .getDOMNode();
      });
    });

    afterEach(() => {
      getElementById.mockRestore();
    });

    it('will navigate the browser to the anchors target when the designated key is pressed', () => {
      const spy = jest.fn();
      pagination = mountWithAppProvider(
        <Pagination
          previousKeys={[Keys.KEY_J]}
          previousTooltip="j"
          previousURL="https://www.google.com"
        />,
      );

      const anchor = pagination.find('a').getDOMNode() as HTMLAnchorElement;
      anchor.click = spy;
      listenerMap.keyup({keyCode: Keys.KEY_J});

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
