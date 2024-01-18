import React from 'react';
import {Transition, CSSTransition} from 'react-transition-group';
import {mountWithApp} from 'tests/utilities';

import {UnstyledButton} from '../../UnstyledButton';
import {SelectAllActions} from '../SelectAllActions';
import styles from '../SelectAllActions.module.scss';

interface Props {
  paginatedSelectAllText: string;
  selected: boolean;
  accessibilityLabel: string;
  label: string;
  disabled: boolean;
}

const selectAllActionProps: Props = {
  paginatedSelectAllText: 'paginated select all text string',
  selected: false,
  accessibilityLabel: 'test-aria-label',
  label: 'Test-Label',
  disabled: false,
};

describe('<SelectAllActions />', () => {
  describe('loading', () => {
    it('disables buttons', () => {
      const selectAllActions = mountWithApp(
        <SelectAllActions
          {...selectAllActionProps}
          paginatedSelectAllAction={{content: 'content', onAction: () => {}}}
          disabled
        />,
      );

      expect(selectAllActions).toContainReactComponentTimes('button', 1, {
        'aria-disabled': true,
      });
    });
  });

  describe('props', () => {
    describe('selectMode', () => {
      it('is passed down to Transition', () => {
        const selectAllActions = mountWithApp(
          <SelectAllActions {...selectAllActionProps} selectMode />,
        );

        expect(selectAllActions).toContainReactComponent(Transition, {
          in: true,
        });
      });

      it('is passed down to CSSTransition', () => {
        const selectAllActions = mountWithApp(
          <SelectAllActions {...selectAllActionProps} selectMode />,
        );

        const cssTransition = selectAllActions.findAll(CSSTransition, {
          appear: true,
        });
        cssTransition.forEach((cssTransitionComponent) => {
          expect(cssTransitionComponent).toHaveReactProps({in: true});
        });
      });
    });

    describe('paginatedSelectAllText', () => {
      it('renders when provided', () => {
        const {paginatedSelectAllText} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions
            {...selectAllActionProps}
            paginatedSelectAllAction={{content: 'content', onAction: () => {}}}
          />,
        );
        expect(selectAllActions).toContainReactText(paginatedSelectAllText);
      });

      it('does not render when not provided', () => {
        const {paginatedSelectAllText, ...props} = selectAllActionProps;
        const selectAllActions = mountWithApp(<SelectAllActions {...props} />);

        expect(selectAllActions).not.toContainReactComponent('div', {
          className: styles.PaginatedSelectAll,
        });
      });
    });

    describe('paginatedSelectAllAction', () => {
      it('onAction is called when UnstyledButton is clicked', () => {
        const spy = jest.fn();

        const selectAllActions = mountWithApp(
          <SelectAllActions
            {...selectAllActionProps}
            paginatedSelectAllAction={{content: 'content', onAction: spy}}
          />,
        );
        selectAllActions
          .find(UnstyledButton, {onClick: spy})!
          .trigger('onClick');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
