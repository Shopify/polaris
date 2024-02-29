import React from 'react';
import type {ReactElement} from 'react';
import {mountWithApp} from 'tests/utilities';
import {setMatchMedia} from 'tests/setup/tests';

import {Cell} from '../Cell';
import {Popover} from '../../../../Popover';

setMatchMedia();

jest.mock('../../../../../utilities/index-provider', () => ({
  ...jest.requireActual('../../../../../utilities/index-provider'),
  useIndexCell: jest.fn(),
}));

jest.mock('../../../../../utilities/breakpoints', () => ({
  ...jest.requireActual('../../../../../utilities/breakpoints'),
  useBreakpoints: jest.fn(),
}));

describe('<Cell />', () => {
  beforeEach(() => {
    mockUseIndexCell();
    mockUseBreakpoints(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
    it('renders a disclosure button if previewContent is provided', () => {
      const cell = mountWithTable(<Cell previewContent={<div>Preview</div>} />);
      const popover = cell.find(Popover);
      expect(popover).not.toBeNull();
    });

    describe('showPreviewOnHover', () => {
      it('sets the data-hovercard-activator attribute if previewContent is provided and showPreviewOnHover is true', () => {
        const cell = mountWithTable(
          <Cell showPreviewOnHover previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        expect(
          previewActivator?.domNode?.getAttribute('data-hovercard-activator'),
        ).toBe('true');
      });

      it('does not set the data-hovercard-activator attribute if a preview is not provided', () => {
        const cell = mountWithTable(
          <Cell previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        expect(
          previewActivator?.domNode?.getAttribute('data-hovercard-activator'),
        ).not.toBe('true');
      });

      it('sets the activatorWrapperClassName if a previewContent is provided and showPreviewOnHover is true', () => {
        mockUseIndexCell();
        const cell = mountWithTable(
          <Cell showPreviewOnHover previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        expect(previewActivator?.domNode?.classList).toContain(
          'ActivatorWrapper',
        );

        expect(previewActivator?.domNode?.classList).toContain('snapToParent');
      });

      it('does not set the activatorWrapperClassName if showPreviewOnHover is not true', () => {
        mockUseIndexCell();
        const cell = mountWithTable(
          <Cell previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        expect(previewActivator?.domNode?.classList).not.toContain(
          'ActivatorWrapper',
        );

        expect(previewActivator?.domNode?.classList).not.toContain(
          'snapToParent',
        );
      });

      it('fires onMouseEnterCell on mouse enter if showPreviewOnHover true', () => {
        const onMouseEnterCell = mockUseIndexCell();
        const cell = mountWithTable(
          <Cell showPreviewOnHover previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        previewActivator!.trigger('onMouseEnter');
        expect(onMouseEnterCell).toHaveBeenCalled();
      });

      it('does not set onMouseEnter if showPreviewOnHover is not true', () => {
        const cell = mountWithTable(
          <Cell previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        expect(previewActivator?.props.onMouseEnter).toBeUndefined();
      });

      it('fires onMouseLeaveCell on mouse enter if showPreviewOnHover is true', () => {
        const onMouseLeaveCell = mockUseIndexCell();
        const cell = mountWithTable(
          <Cell showPreviewOnHover previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        previewActivator!.trigger('onMouseLeave');
        expect(onMouseLeaveCell).toHaveBeenCalled();
      });

      it('does not set onMouseLeave if showPreviewOnHover is not true', () => {
        const cell = mountWithTable(
          <Cell previewContent={<div>Preview</div>} />,
        );
        const previewActivator = cell.find('button');
        expect(previewActivator?.props.onMouseLeave).toBeUndefined();
      });
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

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}
