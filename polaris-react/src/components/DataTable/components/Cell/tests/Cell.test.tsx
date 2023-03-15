import { ReactElement } from 'react';
import {SortAscendingMajor, SortDescendingMajor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Icon} from '../../../../Icon';
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

      expect(cell).toContainReactComponent('p');
      expect(cell).toContainReactText(cellContent);
    });
  });

  describe('nthColumn', () => {
    it('renders a table heading element when true', () => {
      const cell = mountWithTable(<Cell nthColumn />);

      expect(cell).toContainReactComponent('th');
    });
  });

  describe('header', () => {
    it('renders a table heading element when true', () => {
      const cell = mountWithTable(<Cell header />);

      expect(cell).toContainReactComponent('th');
    });
  });

  describe('sorted', () => {
    it('sets the aria-sort attribute to the sortDirection when the table is currently sorted by that column', () => {
      const sortDirection = 'ascending';
      const cell = mountWithTable(
        <Cell header nthColumn sortable sorted sortDirection={sortDirection} />,
      );

      expect(cell).toContainReactComponent('th', {
        'aria-sort': sortDirection,
      });
    });

    it('sets the aria-sort attribute to none when the table is not currently sorted by that column', () => {
      const sortDirection = 'none';
      const cell = mountWithTable(
        <Cell
          header
          nthColumn
          sortable
          sorted={false}
          sortDirection={sortDirection}
        />,
      );

      expect(cell).toContainReactComponent('th', {
        'aria-sort': 'none',
      });
    });
  });

  describe('sortable', () => {
    it('renders an Icon when table is sortable by that column', () => {
      const cell = mountWithTable(<Cell header nthColumn sortable />);

      expect(cell).toContainReactComponent(Icon);
    });

    it('renders no Icon when table is not sortable by that column', () => {
      const cell = mountWithTable(<Cell header nthColumn sortable={false} />);

      expect(cell).not.toContainReactComponent(Icon);
    });
  });

  describe('sortDirection', () => {
    describe('when set to none', () => {
      it('renders a down caret Icon when defaultSortDirection is descending', () => {
        const cell = mountWithTable(
          <Cell
            header
            nthColumn
            sortable
            sortDirection="none"
            defaultSortDirection="descending"
          />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortDescendingMajor,
        });
      });

      it('renders an up caret Icon when defaultSortDirection is ascending', () => {
        const cell = mountWithTable(
          <Cell
            header
            nthColumn
            sortable
            sortDirection="none"
            defaultSortDirection="ascending"
          />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortAscendingMajor,
        });
      });
    });

    describe('when set to ascending', () => {
      it('renders an up caret Icon when table is currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell header nthColumn sortable sorted sortDirection="ascending" />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortAscendingMajor,
        });
      });

      it('renders an Icon with an accessibility label indicating the next sort direction is descending', () => {
        const cell = mountWithTable(
          <Cell header nthColumn sortable sorted sortDirection="ascending" />,
        );

        expect(cell).toContainReactComponent(Icon, {
          accessibilityLabel: 'sort descending by',
        });
      });
    });

    describe('when set to descending', () => {
      it('renders a down caret Icon when table is currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell header nthColumn sortable sorted sortDirection="descending" />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortDescendingMajor,
        });
      });

      it('renders an Icon with an accessibility label indicating the next sort direction is ascending', () => {
        const cell = mountWithTable(
          <Cell header nthColumn sortable sorted sortDirection="descending" />,
        );

        expect(cell).toContainReactComponent(Icon, {
          accessibilityLabel: 'sort ascending by',
        });
      });
    });
  });

  describe('defaultSortDirection', () => {
    describe('when set to none', () => {
      it('renders an up caret Icon when table is not currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            nthColumn
            sortable
            sorted={false}
            sortDirection="none"
            defaultSortDirection="none"
          />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortAscendingMajor,
        });
      });
    });

    describe('when set to ascending', () => {
      it('renders an up caret Icon when table is not currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            nthColumn
            sortable
            sorted={false}
            defaultSortDirection="ascending"
          />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortAscendingMajor,
        });
      });
    });

    describe('when set to descending', () => {
      it('renders a down caret Icon when table is not currently sorted by that column', () => {
        const cell = mountWithTable(
          <Cell
            header
            nthColumn
            sortable
            sorted={false}
            defaultSortDirection="descending"
          />,
        );

        expect(cell).toContainReactComponent(Icon, {
          source: SortDescendingMajor,
        });
      });
    });
  });

  describe('onSort', () => {
    it('gets called when a sortable cell heading is clicked', () => {
      const sortSpy = jest.fn();
      const cell = mountWithTable(
        <Cell
          header
          nthColumn
          sortable
          sorted={false}
          content="Heading 1"
          defaultSortDirection="descending"
          onSort={sortSpy}
        />,
      );

      cell.find('button')?.trigger('onClick');

      expect(sortSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function mountWithTable<T>(node: ReactElement) {
  return mountWithApp<T>(
    <table>
      <thead />
      <tbody>
        <tr>{node}</tr>
      </tbody>
    </table>,
  );
}
