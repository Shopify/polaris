import React, {ReactElement} from 'react';
import {mountWithApp} from 'test-utilities';

import {Cell} from '../Cell';

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
