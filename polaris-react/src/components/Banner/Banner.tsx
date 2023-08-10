import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {classNames} from '../../utilities/css';
import {BannerContext} from '../../utilities/banner-context';
import type {Action, DisableableAction, LoadableAction} from '../../types';
import type {IconProps} from '../Icon';
import {WithinContentContext} from '../../utilities/within-content-context';

import styles from './Banner.scss';
import {BannerExperimental} from './components';

export type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

export interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Status icon to display in the banner. Use only major icons */
  icon?: IconProps['source'];
  /** Renders the banner without a status icon. */
  hideIcon?: boolean;
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
  props: BannerProps,
  bannerRef,
) {
  const {status, stopAnnouncements} = props;
  const withinContentContainer = useContext(WithinContentContext);
  const {wrapperRef, handleKeyUp, handleBlur, handleMouseUp, shouldShowFocus} =
    useBannerFocus(bannerRef);
  const className = classNames(
    styles.Banner,
    shouldShowFocus && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  );

  return (
    <BannerContext.Provider value>
      <div
        className={className}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={wrapperRef}
        role={
          status === 'warning' || status === 'critical' ? 'alert' : 'status'
        }
        aria-live={stopAnnouncements ? 'off' : 'polite'}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      >
        <BannerExperimental {...props} />
      </div>
    </BannerContext.Provider>
  );
});

export interface BannerHandles {
  focus(): void;
}

function useBannerFocus(bannerRef: React.Ref<BannerHandles>) {
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
