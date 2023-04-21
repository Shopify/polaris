import type {ReactNode} from 'react';
import React, {useState} from 'react';

import {Popover, UnstyledButton} from '../src';

export function Playground() {
  return <DefinitionPopover definition="hello world" title="hello world" />;
}

export interface Props {
  /** A title to be displayed in the popover */
  title: string;
  /** The content to be displayed in the popover */
  definition: ReactNode;
}

export function DefinitionPopover({title, definition}: Props) {
  const [hoverActive, setHoverActive] = useState(false);

  function handleClose() {
    setHoverActive(false);
  }

  function handleActivatorMouseEnter() {
    setHoverActive(true);
  }

  function handleActivatorMouseLeave() {
    setHoverActive(false);
  }

  return (
    <Popover
      active={hoverActive}
      activator={
        <UnstyledButton
          aria-describedby="hi"
          type="button"
          onMouseEnter={handleActivatorMouseEnter}
          onMouseLeave={handleActivatorMouseLeave}
        >
          {title}
        </UnstyledButton>
      }
      onClose={handleClose}
    >
      {definition}
    </Popover>
  );
}
