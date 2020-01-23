import React, {useRef, useEffect, useCallback} from 'react';
import {getRectForNode} from '@shopify/javascript-utilities/geometry';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {Key} from '../../types';
import {classNames} from '../css';
import styles from './FocusRing.scss';

export function useFocusRing(
  target: React.RefObject<HTMLElement | HTMLInputElement>,
  trigger: React.RefObject<HTMLInputElement>,
) {
  const focusRing = useRef<HTMLElement | null>(null);
  const focusRingClass = useRef(classNames(styles.FocusRing));
  const focusRingFocusClass = useRef(classNames(styles['FocusRing-focus']));
  const targetEl = target.current;
  const triggerEl = trigger.current;

  const handleTabFocus = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === Key.Tab) {
      focusRing.current &&
        focusRing.current.classList.add(focusRingFocusClass.current);
    }
  }, []);

  const handleBlur = useCallback(() => {
    focusRing.current &&
      focusRing.current.classList.remove(focusRingFocusClass.current);
  }, []);

  useEffect(() => {
    if (!targetEl || !triggerEl || !document) return;
    addEventListener(triggerEl, 'keyup', handleTabFocus);
    addEventListener(triggerEl, 'blur', handleBlur);
    const computedStyles = window.getComputedStyle(targetEl);
    const borderRadius = computedStyles
      .getPropertyValue('border-radius')
      .split(' ')
      .map((radius) => {
        const num = parseInt(radius, 10);
        return num === 0 ? '0px' : `${num + 2}px`;
      });

    const rect = getRectForNode(targetEl);
    const top = rect.top - 3;
    const left = rect.left - 3;
    const width = rect.width + 6;
    const height = rect.height + 6;
    const style = `border-radius: ${borderRadius}; top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px;`;

    if (focusRing.current == null) {
      focusRing.current = document.createElement('div');
      focusRing.current.setAttribute('style', style);
      focusRing.current.setAttribute('class', focusRingClass.current);
      document.body.appendChild(focusRing.current);
    }

    return () => {
      triggerEl && removeEventListener(triggerEl, 'keydown', handleTabFocus);
      triggerEl && removeEventListener(triggerEl, 'blur', handleBlur);
      focusRing.current && document.removeChild(focusRing.current);
    };
  }, [handleBlur, handleTabFocus, targetEl, triggerEl]);
}
