import React, {ReactElement} from 'react';
import {CaretUpMinor, CaretDownMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';

import {Icon} from '../../../..';
import {Cell} from '../Cell';

describe('<Cell />', () => {
  describe('content', () => {
    it('sets text content when provided', () => {
      const cellContent = 'Data';
      const cell = mountWithTable(<Cell content={cellContent} />);

      expect(cell.text()).toBe(cellContent);
    });

    it('sets markup content when provided', () => {
      const cellContent = 'Data';
      const cellMarkup = <p>{cellContent}</p>;
      const cell = mountWithTable(<Cell content={cellMarkup} />);

      expect(cell.find('p')).toHaveLength(1);
      expect(cell.text()).toBe(cellContent);
    });
  });

  describe('firstColumn', () => {
    it('renders a table heading element when true', () => {
      const cell = mountWithTable(<Cell firstColumn />);

      expect(cell.find('th')).toHaveLength(1);
    });
  });

  describe('header', () => {
    it('renders a table heading element when true', () => {
      const cell = mountWithTable(<Cell header />);

      expect(cell.find('th')).toHaveLength(1);
    });
  });

  describe('sorted', () => {
    it('sets the aria-sort attribute to the sortDirection when the table is currently sorted by that column', () => {
      const sortDirection = 'ascending';
      const cell = mountWithTable(
        <Cell
          header
          firstColumn
          sortable
          sorted
          sortDirection={sortDirection}
        />,
      );

      expect(cell.find('th').prop('aria-sort')).toBe(sortDirection);
    });

    it('sets the aria-sort attribute to none when the table is not currently sorted by that column', () => {
      const sortDirection = 'none';
      const cell = mountWithTable(
        <Cell
          header
          firstColumn
          sortable
          sorted={false}
          sortDirection={sortDirection}
        />,
      );

      expect(cell.find('th').prop('aria-sort')).toBe('none');
    });
  });

  describe('sortable', () => {
    it('renders an Icon when table is sortable by that column', () => {
      const cell = mountWithTable(<Cell header firstColumn sortable />);

      expect(cell.find(Icon)).toHaveLength(1);
    });

    it('renders no Icon when table is not sortable by that column', () => {
      const cell = mountWithTable(<Cell header firstColumn sortable={false} />);

      expect(cell.find(Icon)).not.toHaveLength(1);
    });
  });

  describe('sortDirection', () => {
    describe('when set to none', () => {
      it('renders a down caret Icon when defaultSortDirection is descending', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sortDirection="none"
            defaultSortDirection="descending"
          />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretDownMinor);
      });

      it('renders an up caret Icon when defaultSortDirection is ascending', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sortDirection="none"
            defaultSortDirection="ascending"
          />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretUpMinor);
      });
    });

    describe('when set to ascending', () => {
      it('renders an up caret Icon when table is currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell header firstColumn sortable sorted sortDirection="ascending" />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretUpMinor);
      });

      it('renders an Icon with an accessibility label indicating the next sort direction is descending', () => {
        const cell = mountWithTable(
          <Cell header firstColumn sortable sorted sortDirection="ascending" />,
        );

        expect(cell.find(Icon).prop('accessibilityLabel')).toBe(
          'sort descending by',
        );
      });
    });

    describe('when set to descending', () => {
      it('renders a down caret Icon when table is currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sorted
            sortDirection="descending"
          />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretDownMinor);
      });

      it('renders an Icon with an accessibility label indicating the next sort direction is ascending', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sorted
            sortDirection="descending"
          />,
        );

        expect(cell.find(Icon).prop('accessibilityLabel')).toBe(
          'sort ascending by',
        );
      });
    });
  });

  describe('defaultSortDirection', () => {
    describe('when set to none', () => {
      it('renders an up caret Icon when table is not currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sorted={false}
            sortDirection="none"
            defaultSortDirection="none"
          />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretUpMinor);
      });
    });
    describe('when set to ascending', () => {
      it('renders an up caret Icon when table is not currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sorted={false}
            defaultSortDirection="ascending"
          />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretUpMinor);
      });
    });

    describe('when set to descending', () => {
      it('renders a down caret Icon when table is not currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            firstColumn
            sortable
            sorted={false}
            defaultSortDirection="descending"
          />,
        );

        expect(cell.find(Icon).prop('source')).toBe(CaretDownMinor);
      });
    });
  });

  describe('onSort', () => {
    it('gets called when a sortable cell heading is clicked', () => {
      const sortSpy = jest.fn();
      const cell = mountWithTable(
        <Cell
          header
          firstColumn
          sortable
          sorted={false}
          content="Heading 1"
          defaultSortDirection="descending"
          onSort={sortSpy}
        />,
      );

      trigger(cell.find('button'), 'onClick');

      expect(sortSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function mountWithTable<P>(node: ReactElement) {
  return mountWithAppProvider<P>(
    <table>
      <thead />
      <tbody>
        <tr>{node}</tr>
      </tbody>
    </table>,
  );
}
