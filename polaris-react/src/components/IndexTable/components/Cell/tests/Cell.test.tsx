import React, {ReactElement} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Cell} from '../Cell';

jest.mock('../../../hooks/use-is-bulk-actions-sticky', () => ({
  useIsBulkActionsSticky: () => ({
    bulkActionsIntersectionRef: null,
    tableMeasurerRef: null,
    isBulkActionsSticky: false,
    bulkActionsAbsoluteOffset: 0,
  }),
}));

describe('<Cell />', () => {
  it('renders a table data tag', () => {
    const cell = mountWithTable(<Cell />);

    expect(cell).toContainReactComponent('td');
  });

  it('applies flushed styles when flush prop is true', () => {
    const cell = mountWithTable(<Cell flush />);

    expect(cell).toContainReactComponent('td', {
      className: 'TableCell TableCell-flush',
    });
  });

  it('applies className if present', () => {
    const className = 'foo-bar-baz';
    const cell = mountWithTable(<Cell className={className} />);
    expect(cell).toContainReactComponent('td', {
      className: `${className} TableCell`,
    });
  });
});

function mountWithTable(children: ReactElement) {
  const table = mountWithApp(
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>,
  );

  return table;
}
