import React, {useState, useRef} from 'react';
import {PlusCircleIcon, NoteIcon} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import type {IconProps} from '../Icon';
import {Icon} from '../Icon';
import {Spinner} from '../Spinner';

import {TextareaAutosize} from './TextareasAutosize';
import styles from './FloatingTextField.module.scss';

export interface FloatingTextFieldProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  loading?: boolean;
  multiline?: boolean;
  emptyIcon?: IconProps['source'];
  filledIcon?: IconProps['source'];
  onChange?: (value: string) => void;
}

export function FloatingTextField(props: FloatingTextFieldProps) {
  const {
    value,
    defaultValue = '',
    placeholder = '',
    loading = false,
    multiline = false,
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

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange?.(event.target.value);
    setValueState(event.target.value);
  };

  const InputComponent = multiline ? TextareaAutosize : 'input';

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
        tabIndex={isActive ? -1 : 0}
        role={isActive ? undefined : 'button'}
        className={classNames(
          styles.root,
          isHovered && styles.rootHovered,
          isFocused && styles.rootFocused,
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
          // Note: This can optionally be broken into two focus states (IsFocusedRoot and IsFocusedInput)
          if (event.currentTarget.contains(event.relatedTarget)) return;

          setIsFocused(false);
          setIsActive(false);
        }}
        onKeyDown={(event) => {
          if (event.repeat) return;

          if (event.key === 'Enter') {
            if (isActive) {
              if (multiline && event.shiftKey) return;

              // TODO: Track if active was trigger by click or enter key
              // - If click, blur input
              // - Else if enter key, return focus to parent
              inputRef.current?.blur();
              setIsActive(false);
            } else {
              event.preventDefault();
              inputRef.current?.focus();
              setIsActive(true);
            }
          }
        }}
      >
        <span>
          {loading ? (
            <span style={{transform: 'scale(0.75)'}}>
              <Spinner size="small" />
            </span>
          ) : (
            <Icon
              source={
                // eslint-disable-next-line no-nested-ternary
                isActive
                  ? emptyIcon
                  : state === 'filled'
                  ? filledIcon
                  : emptyIcon
              }
              tone={isHovered || isActive || isFocused ? undefined : 'subdued'}
            />
          )}
        </span>
        <InputComponent
          type="text"
          autoComplete="off"
          // @ts-expect-error -- prototype
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
