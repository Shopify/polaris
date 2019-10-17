import React, {useRef, useCallback} from 'react';

import {nodeContainsDescendant} from '@shopify/javascript-utilities/dom';
import {CSSTransition} from '@material-ui/react-transition-group';

import {Scrollable} from '../../../Scrollable';
import {Key} from '../../../../types';
import {Duration} from '../../../shared';
import {classNames} from '../../../../utilities/css';
import {KeypressListener} from '../../../KeypressListener';
import {EventListener} from '../../../EventListener';
import styles from './InlinePopover.scss';

export interface InlinePopoverProps {
  children: React.ReactNode;
  active: boolean;
  activator: React.ReactNode;
  onClose(): void;
}

export function InlinePopover({
  children,
  active,
  activator,
  onClose,
}: InlinePopoverProps) {
  const contentNode = useRef<HTMLDivElement>(null);
  const popoverWrapper = useRef<HTMLDivElement>(null);
  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const isDescendant =
      popoverWrapper.current != null &&
      nodeContainsDescendant(popoverWrapper.current, target);

    if (isDescendant) {
      return;
    }
    onClose();
  };

  const popoverOverlayMarkup = (
    <div className={styles.InlinePopover}>
      <EventListener event="click" handler={handleClick} />
      <EventListener event="touchstart" handler={handleClick} />
      <KeypressListener keyCode={Key.Escape} handler={handleClick} />
      <Scrollable vertical shadow hint className={styles.Scrollable}>
        {children}
      </Scrollable>
    </div>
  );

  const findDOMNode = useCallback(() => {
    return contentNode.current;
  }, []);

  const hiddenClasses = classNames(
    styles.InlinePopoverOverlay,
    styles['InlinePopoverOverlay-hidden'],
  );

  const visibleClasses = classNames(
    styles.InlinePopoverOverlay,
    styles['InlinePopoverOverlay-visible'],
  );

  const tansitionClassNames = {
    appear: hiddenClasses,
    appearActive: visibleClasses,
    enter: hiddenClasses,
    enterActive: visibleClasses,
    enterDone: visibleClasses,
    exit: hiddenClasses,
  };

  const inlinePopoverMarkup = (
    <div className={styles.InlinePopoverWrapper} ref={popoverWrapper}>
      {activator}
      <CSSTransition
        classNames={tansitionClassNames}
        findDOMNode={findDOMNode}
        timeout={Duration.Slow}
        in={active}
        mountOnEnter
        unmountOnExit
      >
        <div ref={contentNode}>{popoverOverlayMarkup}</div>
      </CSSTransition>
    </div>
  );

  return inlinePopoverMarkup;
}
