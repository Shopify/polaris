import React from 'react';

import {useUniqueId} from '../../utilities/unique-id';
import type {Error} from '../../types';
import {Checkbox} from '../Checkbox';
import {RadioButton} from '../RadioButton';
import {InlineError, errorTextID} from '../InlineError';
import {VerticalStack} from '../VerticalStack';
import {Box} from '../Box';
import {Bleed} from '../Bleed';

import styles from './ChoiceList.scss';

interface Choice {
  /** Value of the choice */
  value: string;
  /** Label for the choice */
  label: React.ReactNode;
  /** A unique identifier for the choice */
  id?: string;
  /** Disable choice */
  disabled?: boolean;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Indicates that the choice is aria-describedBy the error message*/
  describedByError?: boolean;
  /**  Method to render children with a choice */
  renderChildren?(isSelected: boolean): React.ReactNode | false;
}

export interface ChoiceListProps {
  /** Label for list of choices */
  title: React.ReactNode;
  /** Collection of choices */
  choices: Choice[];
  /** Collection of selected choices */
  selected: string[];
  /** Name for form input */
  name?: string;
  /** Allow merchants to select multiple options at once */
  allowMultiple?: boolean;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Display an error message */
  error?: Error;
  /** Disable all choices **/
  disabled?: boolean;
  /** Callback when the selected choices change */
  onChange?(selected: string[], name: string): void;
}

export function ChoiceList({
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop,
  error,
  disabled = false,
  name: nameProp,
}: ChoiceListProps) {
  // Type asserting to any is required for TS3.2 but can be removed when we update to 3.3
  // see https://github.com/Microsoft/TypeScript/issues/28768
  const ControlComponent: any = allowMultiple ? Checkbox : RadioButton;

  const name = useUniqueId('ChoiceList', nameProp);
  const finalName = allowMultiple ? `${name}[]` : name;

  const titleMarkup = title ? (
    <Box
      as="legend"
      paddingBlockEnd={{xs: '5', md: '1'}}
      visuallyHidden={titleHidden}
    >
      {title}
    </Box>
  ) : null;

  const choicesMarkup = choices.map((choice) => {
    const {
      value,
      id,
      label,
      helpText,
      disabled: choiceDisabled,
      describedByError,
    } = choice;

    function handleChange(checked: boolean) {
      onChange(
        updateSelectedChoices(choice, checked, selected, allowMultiple),
        name,
      );
    }

    const isSelected = choiceIsSelected(choice, selected);
    const renderedChildren = choice.renderChildren
      ? choice.renderChildren(isSelected)
      : null;
    const children = renderedChildren ? (
      <div className={styles.ChoiceChildren}>
        <Box paddingBlockStart={{xs: '4', md: '0'}}>{renderedChildren}</Box>
      </div>
    ) : null;
    return (
      <li key={value}>
        <Bleed marginBlockEnd={helpText ? {xs: '1', md: '0'} : {xs: '0'}}>
          <ControlComponent
            name={finalName}
            value={value}
            id={id}
            label={label}
            disabled={choiceDisabled || disabled}
            checked={choiceIsSelected(choice, selected)}
            helpText={helpText}
            onChange={handleChange}
            ariaDescribedBy={
              error && describedByError ? errorTextID(finalName) : null
            }
          />
          {children}
        </Bleed>
      </li>
    );
  });

  const errorMarkup = error && (
    <Box paddingBlockStart={{xs: '0', md: '1'}} paddingBlockEnd="2">
      <InlineError message={error} fieldID={finalName} />
    </Box>
  );

  return (
    <VerticalStack
      as="fieldset"
      gap={{xs: '4', md: '0'}}
      aria-invalid={error != null}
      id={finalName}
    >
      {titleMarkup}
      <VerticalStack as="ul" gap={{xs: '4', md: '0'}}>
        {choicesMarkup}
      </VerticalStack>
      {errorMarkup}
    </VerticalStack>
  );
}

function noop() {}

function choiceIsSelected({value}: Choice, selected: string[]) {
  return selected.includes(value);
}

function updateSelectedChoices(
  {value}: Choice,
  checked: boolean,
  selected: string[],
  allowMultiple = false,
) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }

  return selected.filter((selectedChoice) => selectedChoice !== value);
}
