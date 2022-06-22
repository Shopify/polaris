import React, {useEffect, useRef, useState, useCallback} from 'react';

interface Constraints {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseFollowMouseReturn {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  constraints: React.MutableRefObject<Constraints>;
  transformValue: string;
  handleFollowMouseMove: (event: React.MouseEvent) => void;
}

const initialConstraints = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export function useFollowMouse(): UseFollowMouseReturn {
  const targetRef = useRef<HTMLElement>(null);
  const constraints = useRef<Constraints>(initialConstraints);
  const [transformValue, setTransformValue] = useState<string>('');

  useEffect(() => {
    function handleResize() {
      if (!targetRef.current) {
        return;
      }
      const {x, y, height, width} = targetRef.current.getBoundingClientRect();
      constraints.current = {
        x,
        y,
        height,
        width,
      };
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFollowMouseMove = useCallback((event: React.MouseEvent) => {
    if (!constraints.current) {
      return;
    }
    const {clientX, clientY} = event;
    const {x, y, height, width} = constraints.current;

    const centerX = width / 2;
    const centerY = height / 2;

    const dX = clientX - x;
    const dY = clientY - y;

    const transformOverlayX = dX - centerX;
    const transformOverlayY = dY - centerY;

    setTransformValue(
      `translate(${transformOverlayX}px, ${transformOverlayY}px)`,
    );
  }, []);

  return {
    targetRef,
    constraints,
    transformValue,
    handleFollowMouseMove,
  };
}
