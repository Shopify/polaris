import React from 'react';
import {Transition, CSSTransition} from 'react-transition-group';
import {mountWithApp} from 'tests/utilities';

import {CheckableButton} from '../../CheckableButton';
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

  describe('deprecated props', () => {
    describe('accessibilityLabel', () => {
      it('gets passed down to the CheckableButton if present and onToggleAll is present', () => {
        const {accessibilityLabel} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions
            {...selectAllActionProps}
            onToggleAll={() => {}}
            accessibilityLabel={accessibilityLabel}
          />,
        );

        expect(selectAllActions).toContainReactComponent(CheckableButton, {
          accessibilityLabel,
        });
      });

      it('will not render a CheckableButton if the prop is not present', () => {
        const {accessibilityLabel, ...props} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions {...props} onToggleAll={() => {}} />,
        );

        expect(selectAllActions).not.toContainReactComponent(CheckableButton, {
          accessibilityLabel,
        });
      });
    });

    describe('onToggleAll', () => {
      it('gets passed down to the CheckableButton if present and accessibilityLabel is present', () => {
        const {accessibilityLabel} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions
            {...selectAllActionProps}
            onToggleAll={() => {}}
            accessibilityLabel={accessibilityLabel}
          />,
        );

        expect(selectAllActions).toContainReactComponent(CheckableButton, {
          onToggleAll: expect.any(Function),
        });
      });

      it('will not render a CheckableButton if the prop is not present', () => {
        const {accessibilityLabel, ...props} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions
            {...props}
            accessibilityLabel={accessibilityLabel}
          />,
        );

        expect(selectAllActions).not.toContainReactComponent(CheckableButton, {
          onToggleAll: expect.any(Function),
        });
      });
    });

    describe('selected', () => {
      it('gets passed down to the CheckableButton if present and accessibilityLabel and onToggleAll is present', () => {
        const {accessibilityLabel} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions
            {...selectAllActionProps}
            onToggleAll={() => {}}
            accessibilityLabel={accessibilityLabel}
            selected
          />,
        );

        expect(selectAllActions).toContainReactComponent(CheckableButton, {
          selected: true,
        });
      });
    });
  });
});
