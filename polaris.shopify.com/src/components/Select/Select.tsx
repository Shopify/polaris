import React, { useCallback } from "react";
import { className } from "../../utils/various";

import Image from "../Image";

import styles from "./Select.module.scss";

interface SelectOption {
  label: string;
  value: string;
}

export interface Props {
  id: string;
  label: string;
  labelHidden?: boolean;
  options: SelectOption[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const Select = ({
  id,
  label,
  labelHidden = false,
  options,
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
      <select onChange={onChange}>
        {options.map((option, index) => {
          const { value, label } = option;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      <div className={styles.SelectIcon}>
        <Image
          src="/icons/CaretDownMinor.svg"
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
