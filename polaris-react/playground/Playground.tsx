import React from 'react';

import {Page, Stack} from '../src';

import {Display} from './Display';
import {Heading} from './Heading';
import {Body} from './Body';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <Stack vertical>
        <Display size="large" strong>
          Display large strong override
        </Display>
        <Display size="large">Display large</Display>
        <Display size="large" truncate>
          Display large with truncate applied
        </Display>
        <Display size="medium">Display medium</Display>
        <Display size="small">Display small</Display>
        <Display size="small" align="center">
          Display small align center
        </Display>
        <Heading size="xlarge" strong>
          Heading xlarge strong override
        </Heading>
        <Heading size="xlarge">Heading xlarge</Heading>
        <Heading size="xlarge" align="end">
          Heading xlarge align end
        </Heading>
        <Heading size="large">Heading large</Heading>
        <Heading size="medium">Heading medium</Heading>
        <Heading truncate>
          Heading default with truncate applied // Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Officia pariatur ratione iure minus qui
          nesciunt
        </Heading>
        <Heading size="small">Heading small</Heading>
        <Body size="large" strong>
          Body large strong override
        </Body>
        <Body size="large">Body large</Body>
        <Body size="medium">Body medium</Body>
        <Body truncate>
          Body default with truncate applied // Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Officia pariatur ratione iure minus qui
          nesciunt sint maiores ipsam nostrum cum, est doloremque provident
          voluptas, doloribus excepturi atque, explicabo asperiores praesentium.
        </Body>
        <Body align="justify">
          <Body strong as="span">
            Body default align justify
          </Body>{' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          pariatur ratione iure minus qui nesciunt sint maiores ipsam nostrum
          cum, est doloremque provident voluptas, doloribus excepturi atque,
          explicabo asperiores praesentium.
        </Body>
        <Body size="small">Body small</Body>
      </Stack>
    </Page>
  );
}
