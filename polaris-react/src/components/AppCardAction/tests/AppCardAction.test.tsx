import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardAction} from '../AppCardAction';
import {Button} from '../../Button';
import {AppCardActionEnum} from '../types';

describe('<AppCardAction />', () => {
  it('renders with default props', () => {
    const action = mountWithApp(<AppCardAction />);

    expect(action).toContainReactComponent(Button, {
      accessibilityLabel: 'Install app',
      disabled: false,
      loading: false,
      size: 'medium',
      fullWidth: false,
      icon: expect.any(Function),
      onClick: expect.any(Function),
      children: 'Install',
    });
  });

  it('renders Open action', () => {
    const action = mountWithApp(
      <AppCardAction action={{type: AppCardActionEnum.Open}} />,
    );

    expect(action).toContainReactComponent(Button, {
      accessibilityLabel: 'Open app',
      disabled: false,
      loading: false,
      size: 'medium',
      fullWidth: false,
      icon: undefined,
      onClick: expect.any(Function),
      children: 'Open',
    });
  });

  it('renders icon-only button with Install action when variant=narrow', () => {
    const action = mountWithApp(<AppCardAction size="slim" variant="narrow" />);

    expect(action).toContainReactComponent(Button, {
      accessibilityLabel: 'Install app',
      disabled: false,
      loading: false,
      size: 'slim',
      fullWidth: false,
      icon: expect.any(Function),
      onClick: expect.any(Function),
      children: undefined,
    });
  });

  it('renders fullWidth button when variant=full', () => {
    const action = mountWithApp(<AppCardAction variant="full" />);

    expect(action).toContainReactComponent(Button, {
      accessibilityLabel: 'Install app',
      disabled: false,
      loading: false,
      size: 'medium',
      fullWidth: true,
      icon: expect.any(Function),
      onClick: expect.any(Function),
      children: 'Install',
    });
  });

  it('renders disabled button when action.disabled=true', () => {
    const action = mountWithApp(
      <AppCardAction
        action={{type: AppCardActionEnum.Install, disabled: true}}
      />,
    );

    expect(action).toContainReactComponent(Button, {
      accessibilityLabel: 'Install app',
      disabled: true,
      loading: false,
      size: 'medium',
      fullWidth: false,
      icon: expect.any(Function),
      onClick: expect.any(Function),
      children: 'Install',
    });
  });

  it('renders loading button when action.loading=true', () => {
    const action = mountWithApp(
      <AppCardAction
        action={{type: AppCardActionEnum.Install, loading: true}}
      />,
    );

    expect(action).toContainReactComponent(Button, {
      accessibilityLabel: 'Install app',
      disabled: false,
      loading: true,
      size: 'medium',
      fullWidth: false,
      icon: expect.any(Function),
      onClick: expect.any(Function),
      children: 'Install',
    });
  });

  it('triggers action.onAction when action button is clicked', () => {
    const spy = jest.fn();
    const action = mountWithApp(
      <AppCardAction
        action={{type: AppCardActionEnum.Install, onAction: spy}}
      />,
    );

    action.find(Button)?.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
