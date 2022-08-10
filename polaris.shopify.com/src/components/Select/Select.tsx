import {className} from '../../utils/various';

import Image from '../Image';

import styles from './Select.module.scss';

interface SelectOption {
  label: string;
  value: string;
}

export interface Props {
  id: string;
  label: string;
  labelHidden?: boolean;
  selected?: string;
  options: SelectOption[];
  ariaControls?: string;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const Select = ({
  id,
  label,
  options,
  labelHidden = false,
  selected = options[0].value,
  ariaControls,
  onChange,
}: Props) => {
  return (
    <div className={styles.SelectContainer}>
      <label
        className={className(labelHidden && styles.labelHidden)}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        aria-controls={ariaControls}
        id={id}
        value={selected}
        onChange={onChange}
      >
        {options.map((option) => {
          const {value, label} = option;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <div className={styles.SelectIcon}>
        <Image
          src="/api/icons/v0/CaretDownMinor.svg"
          alt="Down Arrow"
          width={16}
          height={16}
          fadeIn={false}
          icon
        />
      </div>
    </div>
  );
};

export default Select;
