import React from 'react';
import {mountWithApp} from 'test-utilities';

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
  it('returns true when the Row is hovered', () => {
    const component = mountWithApp(
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

  it('returns false when the Row is not hovered', () => {
    const component = mountWithApp(
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
