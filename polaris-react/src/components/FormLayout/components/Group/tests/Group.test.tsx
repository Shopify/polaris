import {mountWithApp} from 'tests/utilities';

import {TextField} from '../../../../TextField';
import {Group} from '../Group';

describe('<Group />', () => {
  const children = (
    <TextField onChange={noop} label="test" autoComplete="off" />
  );
  const title = 'Title';
  const helpText = 'Help text';

  it('renders its children', () => {
    const group = mountWithApp(
      <Group title={title} helpText={helpText}>
        {children}
      </Group>,
    );
    expect(group).toContainReactComponent(TextField, {
      onChange: noop,
      label: 'test',
    });
  });

  it('renders its title', () => {
    const group = mountWithApp(
      <Group title={title} helpText={helpText}>
        {children}
      </Group>,
    );
    expect(group).toContainReactText(title);
  });

  it('renders its help text', () => {
    const group = mountWithApp(
      <Group title={title} helpText={helpText}>
        {children}
      </Group>,
    );
    expect(group).toContainReactText(helpText);
  });
});

function noop() {}
