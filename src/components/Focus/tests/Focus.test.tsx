import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Focus from '../Focus';

describe('<Focus />', () => {
  let requestAnimationFrameSpy: jest.SpyInstance;

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    requestAnimationFrameSpy.mockImplementation((cb) => cb());
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  it('mounts', () => {
    const focus = mountWithAppProvider(
      <Focus>
        <div />
      </Focus>,
    );

    expect(focus.exists()).toBe(true);
  });

  it('will not focus any element if none are natively focusable', () => {
    mountWithAppProvider(
      <Focus>
        <div>
          <span />
        </div>
      </Focus>,
    );

    expect(document.body).toBe(document.activeElement);
  });

  it('will focus first focusable node', () => {
    const focus = mountWithAppProvider(
      <Focus>
        <div>
          <input />
        </div>
      </Focus>,
    );

    const input = focus.find('input').getDOMNode();
    expect(input).toBe(document.activeElement);
  });

  it('will not focus the first focusable node is the `disabled` is true', () => {
    const focus = mountWithAppProvider(
      <Focus disabled>
        <div>
          <input />
        </div>
      </Focus>,
    );

    const input = focus.find('input').getDOMNode();
    expect(input).not.toBe(document.activeElement);
  });
});
