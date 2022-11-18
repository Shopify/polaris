import React from 'react';
import {Transition, CSSTransition} from 'react-transition-group';
import {mountWithApp} from 'tests/utilities';

import {CheckableButton} from '../../CheckableButton';
import {UnstyledButton} from '../../UnstyledButton';
import {SelectAllActions} from '../SelectAllActions';
import styles from '../SelectAllActions.scss';

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
    describe('accessibilityLabel', () => {
      it('is passed down to CheckableButton', () => {
        const {accessibilityLabel} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions {...selectAllActionProps} />,
        );
        const checkableButtonLength =
          selectAllActions.findAll(CheckableButton).length;

        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {
            accessibilityLabel,
          },
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {accessibilityLabel, ...props} = selectAllActionProps;
        const selectAllActions = mountWithApp(<SelectAllActions {...props} />);

        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          0,
          {
            accessibilityLabel,
          },
        );
      });
    });

    describe('label', () => {
      it('is passed down to CheckableButton', () => {
        const {label} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions {...selectAllActionProps} />,
        );
        const checkableButtonLength =
          selectAllActions.findAll(CheckableButton).length;
        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {label},
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {label, ...props} = selectAllActionProps;
        const selectAllActions = mountWithApp(<SelectAllActions {...props} />);
        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          0,
          {
            label,
          },
        );
      });
    });

    describe('selected', () => {
      it('is passed down to CheckableButton', () => {
        const {selected} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions {...selectAllActionProps} />,
        );
        const checkableButtonLength =
          selectAllActions.findAll(CheckableButton).length;

        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {selected},
        );
      });

      it('does not pass down to CheckableButton when the property is not provided', () => {
        const {selected, ...props} = selectAllActionProps;
        const selectAllActions = mountWithApp(<SelectAllActions {...props} />);

        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          0,
          {
            selected,
          },
        );
      });
    });

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

    describe('disabled', () => {
      const selectAllActionProps: Props = {
        paginatedSelectAllText: 'paginated select all text string',
        selected: false,
        accessibilityLabel: 'test-aria-label',
        label: 'Test-Label',
        disabled: true,
      };

      it('is passed down to CheckableButton', () => {
        const {disabled} = selectAllActionProps;
        const selectAllActions = mountWithApp(
          <SelectAllActions {...selectAllActionProps} />,
        );
        const checkableButtonLength =
          selectAllActions.findAll(CheckableButton).length;

        expect(selectAllActions).toContainReactComponentTimes(
          CheckableButton,
          checkableButtonLength,
          {disabled},
        );
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
      it('onAction is called when CheckableButton is clicked', () => {
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
