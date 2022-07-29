import type {Ref, ReactNode, KeyboardEvent, MouseEvent} from 'react';
import {
  forwardRef,
  useRef,
  useState,
  useContext,
  useImperativeHandle,
} from 'react';
import {
  CancelSmallMinor,
  CircleTickMajor,
  CircleInformationMajor,
  CircleAlertMajor,
  DiamondAlertMajor,
} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../utilities/css';
import {BannerContext} from '../../utilities/banner-context';
import {useUniqueId} from '../../utilities/unique-id';
import {useI18n} from '../../utilities/i18n';
import type {Action, DisableableAction, LoadableAction} from '../../types';
import {Button} from '../Button';
import {Heading} from '../Heading';
import {ButtonGroup} from '../ButtonGroup';
import {UnstyledButton, unstyledButtonFrom} from '../UnstyledButton';
import {UnstyledLink} from '../UnstyledLink';
import {Spinner} from '../Spinner';
import {Icon, IconProps} from '../Icon';
import {WithinContentContext} from '../../utilities/within-content-context';

import styles from './Banner.scss';

export type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

export interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Icon to display in the banner. Use only major, duotone icons */
  icon?: IconProps['source'];
  /** Sets the status of the banner. */
  status?: BannerStatus;
  /** The child elements to render in the banner. */
  children?: ReactNode;
  /** Action for banner */
  action?: DisableableAction & LoadableAction;
  /** Action | Displays a secondary action */
  secondaryAction?: Action;
  /** Callback when banner is dismissed */
  onDismiss?(): void;
  /** Disables screen reader announcements when changing the content of the banner */
  stopAnnouncements?: boolean;
}

export const Banner = forwardRef<BannerHandles, BannerProps>(function Banner(
  {
    icon,
    action,
    secondaryAction,
    title,
    children,
    status,
    onDismiss,
    stopAnnouncements,
  }: BannerProps,
  bannerRef,
) {
  const withinContentContainer = useContext(WithinContentContext);
  const id = useUniqueId('Banner');
  const i18n = useI18n();
  const {wrapperRef, handleKeyUp, handleBlur, handleMouseUp, shouldShowFocus} =
    useBannerFocus(bannerRef);
  const {defaultIcon, iconColor, ariaRoleType} = useBannerAttributes(status);
  const iconName = icon || defaultIcon;
  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
    onDismiss && styles.hasDismiss,
    shouldShowFocus && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  );

  let headingMarkup: ReactNode = null;
  let headingID: string | undefined;

  if (title) {
    headingID = `${id}Heading`;
    headingMarkup = (
      <div className={styles.Heading} id={headingID}>
        <Heading element="p">{title}</Heading>
      </div>
    );
  }

  const spinnerMarkup = action?.loading ? (
    <button
      disabled
      aria-busy
      className={classNames(styles.Button, styles.loading)}
    >
      <span className={styles.Spinner}>
        <Spinner
          size="small"
          accessibilityLabel={i18n.translate(
            'Polaris.Button.spinnerAccessibilityLabel',
          )}
        />
      </span>
      {action.content}
    </button>
  ) : null;

  const primaryActionMarkup = action ? (
    <div className={styles.PrimaryAction}>
      {action.loading
        ? spinnerMarkup
        : unstyledButtonFrom(action, {
            className: styles.Button,
          })}
    </div>
  ) : null;

  const secondaryActionMarkup = secondaryAction ? (
    <SecondaryActionFrom action={secondaryAction} />
  ) : null;

  const actionMarkup =
    action || secondaryAction ? (
      <div className={styles.Actions}>
        <ButtonGroup>
          {primaryActionMarkup}
          {secondaryActionMarkup}
        </ButtonGroup>
      </div>
    ) : null;

  let contentMarkup: ReactNode = null;
  let contentID: string | undefined;

  if (children || actionMarkup) {
    contentID = `${id}Content`;
    contentMarkup = (
      <div className={styles.Content} id={contentID}>
        {children}
        {actionMarkup}
      </div>
    );
  }

  const dismissButton = onDismiss && (
    <div className={styles.Dismiss}>
      <Button
        plain
        icon={CancelSmallMinor}
        onClick={onDismiss}
        accessibilityLabel="Dismiss notification"
      />
    </div>
  );

  return (
    <BannerContext.Provider value>
      <div
        className={className}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={wrapperRef}
        role={ariaRoleType}
        aria-live={stopAnnouncements ? 'off' : 'polite'}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        aria-labelledby={headingID}
        aria-describedby={contentID}
      >
        {dismissButton}

        <div className={styles.Ribbon}>
          <Icon source={iconName} color={iconColor} />
        </div>

        <div className={styles.ContentWrapper}>
          {headingMarkup}
          {contentMarkup}
        </div>
      </div>
    </BannerContext.Provider>
  );
});

function SecondaryActionFrom({action}: {action: Action}) {
  if (action.url) {
    return (
      <UnstyledLink
        className={styles.SecondaryAction}
        url={action.url}
        external={action.external}
      >
        <span className={styles.Text}>{action.content}</span>
      </UnstyledLink>
    );
  }

  return (
    <UnstyledButton
      className={styles.SecondaryAction}
      onClick={action.onAction}
    >
      <span className={styles.Text}>{action.content}</span>
    </UnstyledButton>
  );
}

interface BannerAttributes {
  iconColor: IconProps['color'];
  defaultIcon: IconProps['source'];
  ariaRoleType: 'status' | 'alert';
}

function useBannerAttributes(status: BannerProps['status']): BannerAttributes {
  switch (status) {
    case 'success':
      return {
        defaultIcon: CircleTickMajor,
        iconColor: 'success',
        ariaRoleType: 'status',
      };

    case 'info':
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: 'highlight',
        ariaRoleType: 'status',
      };

    case 'warning':
      return {
        defaultIcon: CircleAlertMajor,
        iconColor: 'warning',
        ariaRoleType: 'alert',
      };

    case 'critical':
      return {
        defaultIcon: DiamondAlertMajor,
        iconColor: 'critical',
        ariaRoleType: 'alert',
      };

    default:
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: 'base',
        ariaRoleType: 'status',
      };
  }
}

export interface BannerHandles {
  focus(): void;
}

function useBannerFocus(bannerRef: Ref<BannerHandles>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldShowFocus, setShouldShowFocus] = useState(false);

  useImperativeHandle(
    bannerRef,
    () => ({
      focus: () => {
        wrapperRef.current?.focus();
        setShouldShowFocus(true);
      },
    }),
    [],
  );

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };

  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.blur();
    setShouldShowFocus(false);
  };

  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus,
  };
}
