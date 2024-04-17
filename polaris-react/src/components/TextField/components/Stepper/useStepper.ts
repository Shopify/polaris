interface Props {
  value: number | null;
  minValue?: number;
  maxValue?: number;
  valueChanged: (newValue: number) => void;
  disabled?: boolean;
}

interface Value {
  formattedValue: string;
  canDecrement: boolean;
  canIncrement: boolean;
  decrement: () => void;
  increment: () => void;
  handleValueChanged: (input: string) => void;
}

export function useStepper({
  value,
  minValue,
  maxValue,
  valueChanged,
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

  const handleValueChanged = (input: string) => {
    const numberInput = Number(input);
    const coercedNumberInput = coerceValue(numberInput);
    if (coercedNumberInput !== value) {
      valueChanged(coercedNumberInput);
    }
  };

  const decrement = () => {
    if (value === null) {
      return;
    }
    const newValue = coerceValue(value - 1);
    if (newValue !== value) {
      valueChanged(newValue);
    }
  };

  const increment = () => {
    if (value === null) {
      return;
    }
    const newValue = coerceValue(value + 1);
    if (newValue !== value) {
      valueChanged(newValue);
    }
  };

  const formattedValue =
    value === null ? '-' : coerceValue(value).toLocaleString();

  return {
    formattedValue,
    canDecrement,
    canIncrement,
    decrement,
    increment,
    handleValueChanged,
  };
}
