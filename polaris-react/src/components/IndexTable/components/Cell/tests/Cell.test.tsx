import React from 'react';
import type {ReactElement} from 'react';
import {mountWithApp} from 'tests/utilities';
import {setMatchMedia} from 'tests/setup/tests';

import {Cell} from '../Cell';

setMatchMedia();

jest.mock('../../../../../utilities/index-provider', () => ({
  useIndexCell: jest.fn(),
}));

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

  describe('preview', () => {
    it('sets the data-hovercard-activator attribute if a preview is provided', () => {
      const cell = mountWithTable(<Cell previewContent={<div>Preview</div>} />);
      const td = cell.find('td');
      expect(td?.domNode?.getAttribute('data-hovercard-activator')).toBe(
        'true',
      );
    });

    it('does not set the data-hovercard-activator attribute if a preview is not provided', () => {
      const cell = mountWithTable(<Cell />);
      const td = cell.find('td');
      expect(td?.domNode?.getAttribute('data-hovercard-activator')).toBeNull();
    });

    it('sets the activatorWrapperClassName if a preview is provided', () => {
      mockUseIndexCell();
      const cell = mountWithTable(<Cell previewContent={<div>Preview</div>} />);
      const td = cell.find('td');
      expect(td?.domNode?.classList).toContain('ActivatorWrapper');
      expect(td?.domNode?.classList).toContain('snapToParent');
    });

    it('does not set the activatorWrapperClassName if a preview is not provided', () => {
      mockUseIndexCell();
      const cell = mountWithTable(<Cell />);
      const td = cell.find('td');
      expect(td?.domNode?.classList).not.toContain('ActivatorWrapper');
      expect(td?.domNode?.classList).not.toContain('snapToParent');
    });

    it('fires onMouseEnterCell on mouse enter if a preview is provided', () => {
      const onMouseEnterCell = mockUseIndexCell();
      const cell = mountWithTable(<Cell previewContent={<div>Preview</div>} />);
      const td = cell.find('td');
      td!.trigger('onMouseEnter');
      expect(onMouseEnterCell).toHaveBeenCalled();
    });

    it('fires onMouseLeaveCell on mouse enter if a preview is provided', () => {
      const onMouseLeaveCell = mockUseIndexCell();
      const cell = mountWithTable(<Cell previewContent={<div>Preview</div>} />);
      const td = cell.find('td');
      td!.trigger('onMouseLeave');
      expect(onMouseLeaveCell).toHaveBeenCalled();
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

function mockUseIndexCell() {
  const useIndexCell: jest.Mock = jest.requireMock(
    '../../../../../utilities/index-provider',
  ).useIndexCell;

  return useIndexCell.mockReturnValue({
    previewActivatorWrapperClassName: 'ActivatorWrapper snapToParent',
    onMouseEnterCell: jest.fn(),
    onMouseLeaveCell: jest.fn(),
  });
}
