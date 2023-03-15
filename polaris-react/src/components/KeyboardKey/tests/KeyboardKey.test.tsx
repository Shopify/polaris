import {mountWithApp} from 'tests/utilities';

import {KeyboardKey} from '../KeyboardKey';

describe('<KeyboardKey />', () => {
  it('renders a kbd element', () => {
    const keyboardKey = mountWithApp(<KeyboardKey>k</KeyboardKey>);
    expect(keyboardKey).toContainReactComponent('kbd');
  });

  it('renders the uppercase version of its children if one character', () => {
    const keyboardKey = mountWithApp(<KeyboardKey>k</KeyboardKey>);
    expect(keyboardKey.find('kbd')).toContainReactText('K');
  });

  it('renders the lowercase version of its children if more than one character', () => {
    const keyboardKey = mountWithApp(<KeyboardKey>tab</KeyboardKey>);
    expect(keyboardKey.find('kbd')).toContainReactText('tab');
  });

  it('renders an empty string as children when none are provided', () => {
    const keyboardKey = mountWithApp(<KeyboardKey />);
    expect(keyboardKey).toContainReactText('');
  });

  it("renders small icon when size is set to 'small'", () => {
    const keyboardKey = mountWithApp(<KeyboardKey size="small" />);
    expect(keyboardKey).toContainReactComponent('kbd', {
      className: 'KeyboardKey small',
    });
  });
});
