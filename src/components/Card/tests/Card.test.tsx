import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Card from '../../Card';
import {contentContextTypes} from '../../../types';

describe('<Card />', () => {
  it('has a child with contentContext', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.withinContentContainer ? <div /> : null;
    Child.contextTypes = contentContextTypes;

    const containedChild = mountWithAppProvider(
      <Card>
        <Child />
      </Card>,
    );

    const div = containedChild
      .find(Child)
      .find('div')
      .first();
    expect(div.exists()).toBe(true);
  });
});
