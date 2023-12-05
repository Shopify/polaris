import React from 'react';
import {mountWithApp} from 'tests/utilities';

import type {ComplexAction} from '../../../types';
import {buttonFrom, buttonsFrom} from '../utils';
import {Button} from '../Button';
import type {ButtonProps} from '../Button';

describe('buttonFrom', () => {
  it('sets <Button/> `tone` to "critical" if action `destructive` is true', () => {
    const button = mountWithApp(buttonFrom({destructive: true}));
    expect(button).toHaveReactProps({tone: 'critical'});
  });

  it('sets <Button/> `variant` to "plain" if action `plain` is true', () => {
    const button = mountWithApp(buttonFrom({plain: true}));
    expect(button).toHaveReactProps({variant: 'plain'});
  });

  it('sets <Button/> `tone` to "critical" if action `destructive` is true and overrides `tone` is undefined', () => {
    const button = mountWithApp(
      buttonFrom({destructive: true}, {variant: 'primary'}),
    );
    expect(button).toHaveReactProps({tone: 'critical'});
  });

  it('sets <Button/> `variant` to "plain" if action `plain` is true and overrides `variant` is undefined', () => {
    const button = mountWithApp(buttonFrom({plain: true}, {tone: 'success'}));
    expect(button).toHaveReactProps({variant: 'plain'});
  });

  it('sets <Button/> `tone` to "success" if action `destructive` is undefined and overrides `tone` is "success"', () => {
    const button = mountWithApp(
      buttonFrom({destructive: true}, {tone: 'success'}),
    );
    expect(button).toHaveReactProps({tone: 'success'});
  });

  it('sets <Button/> `variant` to "primary" if action `plain` is undefined and overrides `variant` is "primary"', () => {
    const button = mountWithApp(
      buttonFrom({plain: true}, {variant: 'primary'}),
    );
    expect(button).toHaveReactProps({variant: 'primary'});
  });

  it('sets <Button/> `tone` to "success" if action `destructive` is true and overrides `tone` is "success"', () => {
    const button = mountWithApp(
      buttonFrom({destructive: true}, {tone: 'success'}),
    );
    expect(button).toHaveReactProps({tone: 'success'});
  });

  it('sets <Button/> `variant` to "primary" if action `plain` is true and overrides `variant` is "primary"', () => {
    const button = mountWithApp(
      buttonFrom({plain: true}, {variant: 'primary'}),
    );
    expect(button).toHaveReactProps({variant: 'primary'});
  });

  it('does not set <Button/> `tone` if action `destructive` is undefined and overrides `tone` is undefined', () => {
    const button = mountWithApp(buttonFrom({}));
    expect(button).toHaveReactProps({tone: undefined});
  });

  it('does not set <Button/> `variant` if action `plain` is undefined and overrides `variant` is undefined', () => {
    const button = mountWithApp(buttonFrom({}));
    expect(button).toHaveReactProps({variant: undefined});
  });
});

describe('buttonsFrom', () => {
  it('returns a single <Button/> if called with a ComplexAction', () => {
    const button = mountWithApp(buttonsFrom({destructive: true}));
    expect(button).toHaveReactProps({tone: 'critical'});
  });

  it('returns <Button/> array if called with a ComplexAction array', () => {
    const actions: ComplexAction[] = [
      {content: 'Delete', destructive: true},
      {content: 'Edit', plain: true},
      {content: 'Save'},
    ];

    const buttons = mountWithApp<ButtonProps>(
      <div>{buttonsFrom(actions)}</div>,
    );
    expect(buttons).toContainReactComponentTimes(Button, 3);
  });
});
