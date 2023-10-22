import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../../../../ActionList';
import {Popover} from '../../../../Popover';
import {BulkActionMenu, BulkActionButton} from '../..';
import type {BulkActionsMenuProps} from '../..';

const defaultProps: BulkActionsMenuProps = {
  title: 'New promoted action',
  actions: [{content: 'Action1', onAction: jest.fn}],
  isNewBadgeInBadgeActions: false,
};

describe('BulkActionMenu', () => {
  describe('initial render', () => {
    it('renders an inactive Popover', () => {
      const bulkActionMenu = mountWithApp(<BulkActionMenu {...defaultProps} />);

      expect(bulkActionMenu).toContainReactComponent(Popover, {
        active: false,
      });
    });

    it('does not render an ActionList', () => {
      const bulkActionMenu = mountWithApp(<BulkActionMenu {...defaultProps} />);

      expect(bulkActionMenu).not.toContainReactComponent(ActionList);
    });

    it('renders a BulkActionButton as the Popover activator with the right props', () => {
      const bulkActionMenu = mountWithApp(<BulkActionMenu {...defaultProps} />);

      expect(bulkActionMenu).toContainReactComponent(BulkActionButton, {
        indicator: defaultProps.isNewBadgeInBadgeActions,
        disclosure: true,
        content: defaultProps.title,
      });
    });
  });

  describe('upon click', () => {
    it('renders an active Popover', () => {
      const bulkActionMenu = mountWithApp(<BulkActionMenu {...defaultProps} />);
      const bulkActionButton = bulkActionMenu.find(BulkActionButton);
      bulkActionButton!.trigger('onAction');

      expect(bulkActionMenu).toContainReactComponent(Popover, {
        active: true,
      });
    });

    it('renders an ActionList with the supplied actions', () => {
      const bulkActionMenu = mountWithApp(<BulkActionMenu {...defaultProps} />);
      const bulkActionButton = bulkActionMenu.find(BulkActionButton);
      bulkActionButton!.trigger('onAction');

      expect(bulkActionMenu).toContainReactComponent(ActionList, {
        items: defaultProps.actions,
      });
    });

    it('closes the Popover when an action is clicked', () => {
      const bulkActionMenu = mountWithApp(<BulkActionMenu {...defaultProps} />);
      const bulkActionButton = bulkActionMenu.find(BulkActionButton);
      bulkActionButton!.trigger('onAction');
      const actionList = bulkActionMenu.find(ActionList);
      actionList!.trigger('onActionAnyItem');

      expect(bulkActionMenu).toContainReactComponent(Popover, {
        active: false,
      });
    });
  });
});
