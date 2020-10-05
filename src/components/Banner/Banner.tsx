import React, {
  forwardRef,
  useRef,
  useState,
  useContext,
  useImperativeHandle,
} from 'react';
import {
  CancelSmallMinor,
  FlagMajor,
  CircleTickMajor,
  CircleInformationMajor,
  CircleAlertMajor,
  CircleDisabledMajor,
} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../utilities/css';
import {BannerContext} from '../../utilities/banner-context';
import {useFeatures} from '../../utilities/features';
import {useUniqueId} from '../../utilities/unique-id';
import type {
  Action,
  DisableableAction,
  LoadableAction,
  IconProps,
} from '../../types';
import {Button, buttonFrom} from '../Button';
import {Heading} from '../Heading';
import {ButtonGroup} from '../ButtonGroup';
import {UnstyledLink} from '../UnstyledLink';
import {Icon} from '../Icon';
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
  children?: React.ReactNode;
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
  const {newDesignLanguage} = useFeatures();
  const withinContentContainer = useContext(WithinContentContext);
  const buttonSizeValue = withinContentContainer ? 'slim' : undefined;
  const id = useUniqueId('Banner');
  const {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus,
  } = useBannerFocus(bannerRef);
  const {defaultIcon, iconColor, ariaRoleType} = useBannerAttributes(
    status,
    newDesignLanguage,
  );
  const iconName = icon || defaultIcon;
  const className = classNames(
    styles.Banner,
    status && styles[variationName('status', status)],
    onDismiss && styles.hasDismiss,
    shouldShowFocus && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
    newDesignLanguage && styles.newDesignLanguage,
  );

  let headingMarkup: React.ReactNode = null;
  let headingID: string | undefined;

  if (title) {
    headingID = `${id}Heading`;
    headingMarkup = (
      <div className={styles.Heading} id={headingID}>
        <Heading element="p">{title}</Heading>
      </div>
    );
  }

  const actionMarkup = action && (
    <div className={styles.Actions}>
      <ButtonGroup>
        <div className={styles.PrimaryAction}>
          {buttonFrom(action, {outline: true, size: buttonSizeValue})}
        </div>

        {secondaryAction && <SecondaryActionFrom action={secondaryAction} />}
      </ButtonGroup>
    </div>
  );

  let contentMarkup: React.ReactNode = null;
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
          <Icon
            source={iconName}
            color={iconColor}
            backdrop={!newDesignLanguage}
          />
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
    <button className={styles.SecondaryAction} onClick={action.onAction}>
      <span className={styles.Text}>{action.content}</span>
    </button>
  );
}

interface BannerAttributes {
  iconColor: IconProps['color'];
  defaultIcon: IconProps['source'];
  ariaRoleType: 'status' | 'alert';
}

function useBannerAttributes(
  status: BannerProps['status'],
  newDesignLanguage: boolean,
): BannerAttributes {
  switch (status) {
    case 'success':
      return {
        defaultIcon: CircleTickMajor,
        iconColor: newDesignLanguage ? 'success' : 'greenDark',
        ariaRoleType: 'status',
      };

    case 'info':
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: newDesignLanguage ? 'highlight' : 'tealDark',
        ariaRoleType: 'status',
      };

    case 'warning':
      return {
        defaultIcon: CircleAlertMajor,
        iconColor: newDesignLanguage ? 'warning' : 'yellowDark',
        ariaRoleType: 'alert',
      };

    case 'critical':
      return {
        defaultIcon: CircleDisabledMajor,
        iconColor: newDesignLanguage ? 'critical' : 'redDark',
        ariaRoleType: 'alert',
      };

    default:
      return {
        defaultIcon: newDesignLanguage ? CircleInformationMajor : FlagMajor,
        iconColor: newDesignLanguage ? 'base' : 'inkLighter',
        ariaRoleType: 'status',
      };
  }
}

export interface BannerHandles {
  focus(): void;
}

function useBannerFocus(bannerRef: React.Ref<BannerHandles>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldShowFocus, setShouldShowFocus] = useState(false);

  useImperativeHandle(bannerRef, () => ({
    focus: () => {
      wrapperRef.current?.focus();
      setShouldShowFocus(true);
    },
  }));

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };

  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
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
