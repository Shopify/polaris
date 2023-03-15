import {mountWithApp} from 'tests/utilities';

import {Item} from '../Item';

describe('<Item />', () => {
  it('handles focus', () => {
    const item = mountWithApp(<Item />);

    item.find('div')!.trigger('onFocus');

    expect(item).toContainReactComponent('div', {
      className: expect.stringContaining('Item-focused'),
    });
  });

  it('handles blur', () => {
    const item = mountWithApp(<Item />);

    item.find('div')!.trigger('onBlur');

    expect(item).not.toContainReactComponent('div', {
      className: expect.stringContaining('Item-focused'),
    });
  });
});
