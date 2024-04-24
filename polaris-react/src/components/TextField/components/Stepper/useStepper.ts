interface Props {
  value: number | null;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
}

interface Value {
  canDecrement: boolean;
  canIncrement: boolean;
}

export function useStepper({
  value,
  minValue,
  maxValue,
  disabled,
}: Props): Value {
  const isDisabled = disabled === true || value === null;

  const canDecrement = isDisabled ? false : value > (minValue ?? -Infinity);
  const canIncrement = isDisabled ? false : value < (maxValue ?? Infinity);

  return {
    canDecrement,
    canIncrement,
  };
}
