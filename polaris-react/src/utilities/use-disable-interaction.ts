import {useCallback} from 'react';

/**
 * useDisableInteraction provides the original event handler but disables interaction
 * if the boolean passed is true.
 * @param disabled - A boolean value that determines if the button should
 * be disabled
 * @param handleEvent - The original event handler
 * @returns Function - The original event handler but with interactions disabled if the
 * provided boolean is true
 * @example
 * function ComponentExample() {
 * const handleClick = () => {
 *  console.log('disable me');
 * };
 * const handleClickWrapper = useDisableInteraction(true, handleClick);
 * return <button onClick={handleClickWrapper}>Im Disabled</button>;
 * }
 */

export function useDisableClick(
  disabled = false as boolean,
  handleClick: () => void = () => {},
) {
  const handleClickWrapper = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event?.preventDefault();
        event?.stopPropagation();
      } else {
        handleClick();
      }
    },
    [disabled, handleClick],
  );

  return handleClickWrapper;
}

export function useDisableKeyboard(
  disabled = false as boolean,
  handleKeyDown: (
    event?: React.KeyboardEvent<HTMLButtonElement>,
  ) => void = () => {},
) {
  const handleKeyDownWrapper = useCallback(
    (event?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled && (event?.key === ' ' || event?.key === 'Enter')) {
        event?.preventDefault();
        event?.stopPropagation();
      } else {
        handleKeyDown(event);
      }
    },
    [disabled, handleKeyDown],
  );

  return handleKeyDownWrapper;
}
