import {setActivatorAttributes} from '../set-activator-attributes';

describe('setActivatorAttributes', () => {
  const id = 'id';
  it('applies aria-controls to the activator', () => {
    const div = document.createElement('div');
    setActivatorAttributes(div, {active: true, id, ariaHaspopup: true});
    expect(div.getAttribute('aria-controls')).toBe(id);
  });

  it('applies aria-owns to the activator', () => {
    const div = document.createElement('div');
    setActivatorAttributes(div, {active: true, id, ariaHaspopup: true});
    expect(div.getAttribute('aria-owns')).toBe(id);
  });

  it('applies aria-expanded to the activator', () => {
    const div = document.createElement('div');
    setActivatorAttributes(div, {active: true, id, ariaHaspopup: true});
    expect(div.getAttribute('aria-expanded')).toBe('true');
  });

  it('applies aria-haspopup to the activator', () => {
    const div = document.createElement('div');
    setActivatorAttributes(div, {active: true, id, ariaHaspopup: true});
    expect(div.getAttribute('aria-haspopup')).toBe('true');
  });

  it("does not apply aria-haspopover when it's undefined", () => {
    const div = document.createElement('div');
    setActivatorAttributes(div, {active: true, id, ariaHaspopup: undefined});
    expect(div.getAttribute('aria-haspopup')).toBeNull();
  });
});
