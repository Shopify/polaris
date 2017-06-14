import * as React from 'react';
import {shallow} from 'enzyme';
import Labelled from '..';
import Label from '../../Label';

describe('<Labelled />', () => {
  it('passes relevant props along to the label', () => {
    const action = {content: 'Do something'};
    const element = shallow(
      <Labelled
        id="my-label"
        action={action}
        label="Label"
      />,
    );
    const label = element.find(Label);

    expect(label.prop('id')).toBe('my-label');
    expect(label.prop('action')).toBe(action);
    expect(label.prop('children')).toBe('Label');
  });

  it('renders the content as a child outside of the label', () => {
    function MyComponent() { return <div />; }

    const element = shallow(<Labelled id="MyLabelled" label="Label"><MyComponent /></Labelled>);
    expect(element.find(MyComponent).exists()).toBe(true);
  });
});
