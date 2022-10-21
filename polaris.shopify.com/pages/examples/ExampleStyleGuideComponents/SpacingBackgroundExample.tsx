import React from 'react';

export interface SpacingBackgroundProps {
  children: React.ReactNode;
  width?: string;
}

export const SpacingBackground = ({
  children,
  width,
}: SpacingBackgroundProps) => {
  return (
    <div
      style={{
        background:
          'repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 10px)',
        width: width ? `${width}px` : '100%',
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};
