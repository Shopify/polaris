interface Props {
  value: number | null;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
}

interface Value {
  formattedValue: string;
  canDecrement: boolean;
  canIncrement: boolean;
}

export function useStepper({
  value,
  minValue,
  maxValue,
  disabled,
}: Props): Value {
  const coerceValue = (proposedValue: number) => {
    const actualMinValue = minValue ?? -Infinity;
    const actualMaxValue = maxValue ?? Infinity;

    return Math.max(actualMinValue, Math.min(proposedValue, actualMaxValue));
  };

  const isDisabled = disabled === true || value === null;

  const canDecrement = isDisabled ? false : value > (minValue ?? -Infinity);
  const canIncrement = isDisabled ? false : value < (maxValue ?? Infinity);

  const formattedValue =
    value === null ? '-' : coerceValue(value).toLocaleString();

  return {
    formattedValue,
    canDecrement,
    canIncrement,
  };
}
