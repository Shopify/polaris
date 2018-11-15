import {ClientApplication} from '@shopify/app-bridge';
import {Redirect, Button, ButtonGroup} from '@shopify/app-bridge/actions';
// eslint-disable-next-line shopify/strict-component-boundaries
import {ActionGroupDescriptor} from '../components/Page/components/Header/components/ActionGroup';
import {
  AppBridgeTarget,
  ComplexAction,
  ActionListItemDescriptor,
} from '../types';

export function generateRedirect(
  appBridge: ClientApplication<{}>,
  url?: string,
  target: AppBridgeTarget = 'APP',
  external?: boolean,
) {
  if (url == null) {
    return undefined;
  }

  const redirect = Redirect.create(appBridge);
  const payload =
    external === true
      ? {
          url,
          newContext: true,
        }
      : url;

  return () => {
    redirect.dispatch(redirectAction(target, external), payload);
  };
}

function redirectAction(target: AppBridgeTarget): Redirect.Action.APP;
function redirectAction(target: AppBridgeTarget): Redirect.Action.ADMIN_PATH;
function redirectAction(
  target: AppBridgeTarget,
  external?: boolean,
): Redirect.Action.REMOTE;
function redirectAction(target: AppBridgeTarget, external?: boolean) {
  if (external === true) {
    return Redirect.Action.REMOTE;
  }

  return Redirect.Action[target];
}

export function transformActions(
  appBridge: ClientApplication<{}>,
  {
    primaryAction,
    secondaryActions,
  }: {
    primaryAction?: ComplexAction;
    secondaryActions?: ComplexAction[];
  },
): {
  primary?: Button.Button;
  secondary?: Button.Button[];
};
export function transformActions(
  appBridge: ClientApplication<{}>,
  {
    primaryAction,
    secondaryActions,
    actionGroups,
  }: {
    primaryAction?: ComplexAction;
    secondaryActions?: ComplexAction[];
    actionGroups?: ActionGroupDescriptor[];
  },
): {
  primary?: Button.Button;
  secondary?: (Button.Button | ButtonGroup.ButtonGroup)[];
};
export function transformActions(
  appBridge: ClientApplication<{}>,
  {
    primaryAction,
    secondaryActions,
    actionGroups,
  }: {
    primaryAction?: ComplexAction;
    secondaryActions?: ComplexAction[];
    actionGroups?: ActionGroupDescriptor[];
  },
): {
  primary?: Button.Button;
  secondary?: (Button.Button | ButtonGroup.ButtonGroup)[];
} {
  const primary = transformPrimaryAction(appBridge, primaryAction);
  const secondary = [
    ...transformSecondaryActions(appBridge, secondaryActions),
    ...transformActionGroups(appBridge, actionGroups),
  ];

  return {
    primary,
    secondary,
  };
}

function transformAction(
  appBridge: ClientApplication<{}>,
  action: ComplexAction,
) {
  const style = action.destructive === true ? Button.Style.Danger : undefined;

  const button = Button.create(appBridge, {
    label: action.content || '',
    disabled: action.disabled,
    style,
  });

  if (action.onAction) {
    button.subscribe(Button.Action.CLICK, action.onAction);
  }

  const redirect = generateRedirect(
    appBridge,
    action.url,
    action.target,
    action.external,
  );

  if (redirect != null) {
    button.subscribe(Button.Action.CLICK, redirect);
  }

  return button;
}

function transformPrimaryAction(
  appBridge: ClientApplication<{}>,
  primaryAction?: ComplexAction,
) {
  if (primaryAction == null) {
    return undefined;
  }

  const primary = transformAction(appBridge, primaryAction);

  return primary;
}

function transformSecondaryActions(
  appBridge: ClientApplication<{}>,
  secondaryActions: ComplexAction[] = [],
) {
  const secondary = [
    ...secondaryActions.map((secondaryAction) => {
      return transformAction(appBridge, secondaryAction);
    }),
  ];

  return secondary;
}

function transformActionGroups(
  appBridge: ClientApplication<{}>,
  actionGroups: ActionGroupDescriptor[] = [],
) {
  const buttonGroups = [
    ...actionGroups.map((group: ActionGroupDescriptor) => {
      const buttons = group.actions.map(
        (groupAction: ActionListItemDescriptor) => {
          return transformAction(appBridge, groupAction);
        },
      );
      return ButtonGroup.create(appBridge, {label: group.title, buttons});
    }),
  ];

  return buttonGroups;
}
