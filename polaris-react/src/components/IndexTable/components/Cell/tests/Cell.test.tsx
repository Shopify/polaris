import React from 'react';
import type {ReactElement} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Cell} from '../Cell';

describe('<Cell />', () => {
  it('renders a table data tag', () => {
    const cell = mountWithTable(<Cell />);

    expect(cell).toContainReactComponent('td');
  });

  it('renders a th element if set on `as` prop', () => {
    const cell = mountWithTable(<Cell as="th" />);

    expect(cell).toContainReactComponent('th');
  });

  it('renders a td element if  `as` prop is not set', () => {
    const cell = mountWithTable(<Cell />);

    expect(cell).toContainReactComponent('td');
  });

  it('forwards the `colSpan` prop', () => {
    const cell = mountWithTable(<Cell colSpan={3} />);

    expect(cell.find('td')).toHaveReactProps({colSpan: 3});
  });

  it('forwards the `scope` prop', () => {
    const cell = mountWithTable(<Cell scope="colgroup" />);

    expect(cell.find('td')).toHaveReactProps({scope: 'colgroup'});
  });

  it('forwards the `headers` prop', () => {
    const cell = mountWithTable(<Cell headers="last-order-date name" />);

    expect(cell.find('td')).toHaveReactProps({
      colSpan: 3,
      headers: 'last-order-date name',
    });
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
