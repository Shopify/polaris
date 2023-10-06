import {useState, useId} from 'react';
import TextField from '../TextField';

import styles from './MigrationPathCombobox.module.scss';

interface Props {
  onChange(value: string): void;
  options: string[];
  defaultOption?: string;
}

export default function MigrationPathCombobox({
  options,
  defaultOption = '',
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState([defaultOption]);
  const [search, setSearch] = useState('');

  const popoverId = `Popover-${useId()}`;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    options.filter((option) => option.includes(value));
  };

  const directoryInput = (
    <TextField
      // @ts-ignore -- The Popover API is real
      popovertarget={popoverId}
      popovertargetaction="toggle"
      value={search}
      onChange={handleSearchChange}
    />
  );

  const optionsMarkup = [...new Set([...options, ...selectedOptions])].map(
    (option) => {
      const isSelected = selectedOptions.includes(option);
      const className = isSelected ? 'selected' : undefined;

      return (
        <li
          key={option}
          className={className}
          onClick={() => {
            setSelectedOptions([option]);
          }}
        >
          {option}
        </li>
      );
    },
  );

  return (
    <div className={styles.MigrationPathCombobox}>
      {directoryInput}
      <Popover id={popoverId}>
        <ul className={styles.Listbox}>{optionsMarkup}</ul>
      </Popover>
    </div>
  );
}

function Popover({
  id,
  children,
  onToggle,
}: {
  id: string;
  children: React.PropsWithChildren['children'];
  onToggle?(): void;
}) {
  return (
    <div
      id={id}
      // @ts-ignore -- The Popover API is real
      popover
      className={styles.Popover}
      onToggle={onToggle}
    >
      {children}
    </div>
  );
}
