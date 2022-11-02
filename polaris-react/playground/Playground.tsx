import React from 'react';

import {Page, Box} from '../src';

const spanStyle = {
  display: 'inline-flex',
  minHeight: '28px',
  background: 'cadetblue',
  borderRadius: '3px',
  color: 'grey',
};

const buttonStyle = {
  background: 'none',
  border: 'none',
};

export function Playground() {
  return (
    <Page title="Playground">
      <span style={spanStyle}>
        <button style={buttonStyle}>span button</button>
      </span>
      <br />
      <br />
      <Box
        as="span"
        background="surface-neutral"
        maxWidth="100%"
        minHeight="1.5rem"
        borderRadius="1"
        color="text"
        paddingBlockEnd="0"
        paddingBlockStart="0"
        paddingInlineStart="2"
        paddingInlineEnd="2"
      >
        span box
      </Box>
      <br />
      <br />
      <Box
        as="span"
        background="surface-neutral"
        maxWidth="100%"
        minHeight="1.5rem"
        borderRadius="1"
        color="text"
        paddingBlockEnd="0"
        paddingBlockStart="0"
        paddingInlineStart="2"
        paddingInlineEnd="2"
      >
        <button style={buttonStyle}>span box button</button>
      </Box>

      <br />
      <br />

      <Box
        as="div"
        background="surface-neutral"
        maxWidth="100%"
        minHeight="1.5rem"
        borderRadius="1"
        color="text"
        paddingBlockEnd="0"
        paddingBlockStart="0"
        paddingInlineStart="2"
        paddingInlineEnd="2"
      >
        div box
      </Box>

      <br />
      <br />

      <Box
        as="div"
        background="surface-neutral"
        maxWidth="100%"
        minHeight="1.5rem"
        borderRadius="1"
        color="text"
        paddingBlockEnd="0"
        paddingBlockStart="0"
        paddingInlineStart="2"
        paddingInlineEnd="2"
      >
        <button style={buttonStyle}>div box button</button>
      </Box>
    </Page>
  );
}
