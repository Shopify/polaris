import React, {useState, useRef} from 'react';
import {PlusCircleIcon, NoteIcon} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import type {IconProps} from '../Icon';
import {Icon} from '../Icon';
import {Spinner} from '../Spinner';

import styles from './FloatingTextField.module.scss';

export interface FloatingTextFieldProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  loading?: boolean;
  emptyIcon?: IconProps['source'];
  filledIcon?: IconProps['source'];
  onChange?: (value: string) => void;
}

export function FloatingTextField(props: FloatingTextFieldProps) {
  const {
    value,
    defaultValue = '',
    loading = false,
    placeholder = '',
    emptyIcon = PlusCircleIcon,
    filledIcon = NoteIcon,
    onChange,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [valueState, setValueState] = useState(defaultValue);
  const valueDerived = value || valueState;

  const state = valueDerived ? 'filled' : 'empty';

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
    setValueState(event.target.value);
  };

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              state,
              isHovered,
              isFocused,
              isActive,
            },
            null,
            2,
          )}
        </code>
      </pre>
      <span
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={classNames(
          styles.root,
          isHovered && styles.rootHovered,
          isActive && styles.rootActive,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsActive(true);
          inputRef.current?.focus();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          // Don't blur if focus is moving to input
          if (event.currentTarget.contains(event.relatedTarget)) return;

          setIsFocused(false);
          setIsActive(false);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            if (isActive) {
              // TODO: Track if active was trigger by click or enter key
              // - If click, blur input
              // - Else if enter key, return focus to parent
              inputRef.current?.blur();
              setIsActive(false);
            } else {
              inputRef.current?.focus();
              setIsActive(true);
            }
          }
        }}
      >
        {loading ? (
          <span style={{transform: 'scale(0.75)'}}>
            <Spinner size="small" />
          </span>
        ) : (
          <Icon
            source={valueDerived || isActive ? filledIcon : emptyIcon}
            tone={isHovered || isActive ? undefined : 'subdued'}
          />
        )}
        <input
          type="text"
          autoComplete="off"
          ref={inputRef}
          tabIndex={isActive ? 0 : -1}
          className={classNames(
            styles.input,
            state === 'empty' && styles.inputEmpty,
            loading && styles.inputLoading,
          )}
          value={isActive ? valueDerived : valueDerived || placeholder}
          onChange={handleChange}
        />
      </span>
    </>
  );
}
