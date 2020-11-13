import React from 'react';
import {mountWithAppContext} from 'tests/modern';

import {IndexProvider} from '../../../../IndexProvider';
import {Row} from '../Row';
import {useRowHovered} from '../hooks';

function Component() {
  const hovered = useRowHovered();
  const content = hovered ? 'In' : 'Out';

  return <td>{content}</td>;
}

const defaultIndexProviderProps = {
  itemCount: 0,
  selectedItemsCount: 0,
};

describe('useRowHovered', () => {
  it('returns true when the Row is hovered', async () => {
    const component = await mountWithAppContext(
      <IndexProvider {...defaultIndexProviderProps}>
        <table>
          <tbody>
            <Row id="id" selected position={1}>
              <Component />
            </Row>
          </tbody>
        </table>
      </IndexProvider>,
    );

    component.find('tr')!.trigger('onMouseEnter');

    expect(component).toContainReactText('In');
  });

  it('returns false when the Row is not hovered', async () => {
    const component = await mountWithAppContext(
      <IndexProvider {...defaultIndexProviderProps}>
        <table>
          <tbody>
            <Row id="id" selected position={1}>
              <Component />
            </Row>
          </tbody>
        </table>
      </IndexProvider>,
    );

    component.find('tr')!.trigger('onMouseLeave');

    expect(component).toContainReactText('Out');
  });
});
