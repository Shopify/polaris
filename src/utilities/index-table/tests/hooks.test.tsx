import React from 'react';
import {mountWithApp} from 'test-utilities';

import {IndexProvider} from '../../../components/IndexProvider';
import {IndexTable} from '../../../components/IndexTable';
import {useRowHovered} from '../hooks';

function Component() {
  const hovered = useRowHovered();
  const content = hovered ? 'In' : 'Out';

  return <td>{content}</td>;
}

const defaultIndexProviderProps = {
  itemCount: 0,
  selectedItemsCount: 0,
  onSelectionChange: () => {},
};

describe('useRowHovered', () => {
  it.only('returns true when the Row is hovered', () => {
    const component = mountWithApp(
      <IndexProvider {...defaultIndexProviderProps}>
        <table>
          <tbody>
            <IndexTable.Row id="id" selected position={1}>
              <Component />
            </IndexTable.Row>
          </tbody>
        </table>
      </IndexProvider>,
    );

    component.find('tr')!.trigger('onMouseEnter');

    expect(component).toContainReactText('In');
  });

  it('returns false when the Row is not hovered', () => {
    const component = mountWithApp(
      <IndexProvider {...defaultIndexProviderProps}>
        <table>
          <tbody>
            <IndexTable.Row id="id" selected position={1}>
              <Component />
            </IndexTable.Row>
          </tbody>
        </table>
      </IndexProvider>,
    );

    component.find('tr')!.trigger('onMouseLeave');

    expect(component).toContainReactText('Out');
  });
});
