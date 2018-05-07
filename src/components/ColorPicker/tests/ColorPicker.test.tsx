import * as React from 'react';
import {mount} from 'enzyme';
import ColorPicker from '../ColorPicker';
import Slidable from '../Slidable';

const red = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

enum Slidables {
  BrightnessSaturation,
  Hue,
}

describe('<ColorPicker />', () => {
  describe('Saturation/ Brightness pane', () => {
    describe('onChange', () => {
      it('is called when the user mouse downs', () => {
        const spy = jest.fn();
        mount(<ColorPicker color={red} onChange={spy} />)
          .find(Slidable)
          .at(Slidables.BrightnessSaturation)
          .simulate('mousedown');

        expect(spy).toHaveBeenCalled();
      });

      it.skip('is called on mousemove when dragging');

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mount(<ColorPicker color={red} onChange={spy} />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Hue slider', () => {
    describe('onChange', () => {
      it('is called when the user mouse downs', () => {
        const spy = jest.fn();
        mount(<ColorPicker color={red} onChange={spy} />)
          .find(Slidable)
          .at(Slidables.Hue)
          .simulate('mousedown');

        expect(spy).toHaveBeenCalled();
      });

      it.skip('is called on mousemove when dragging');

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mount(<ColorPicker color={red} onChange={spy} />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('id', () => {
    it('is passed down to the first child', () => {
      const id = 'MyID';
      const colorPicker = mount(
        <ColorPicker id={id} color={red} onChange={jest.fn()} />,
      );

      expect(colorPicker.childAt(0).prop('id')).toBe(id);
    });
  });
});
