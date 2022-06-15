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
        <Display size="large" noWrap>
          Display large with noWrap applied
        </Display>
        <Display size="medium">Display medium</Display>
        <Display size="small">Display small</Display>
        <Heading size="xlarge" strong>
          Heading xlarge strong override
        </Heading>
        <Heading size="xlarge">Heading xlarge</Heading>
        <Heading size="large">Heading large</Heading>
        <Heading size="medium">Heading medium</Heading>
        <Heading noWrap>
          Heading default with noWrap applied // Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Officia pariatur ratione iure minus qui
          nesciunt
        </Heading>
        <Heading size="small">Heading small</Heading>
        <Body size="large" strong>
          Body large strong override
        </Body>
        <Body size="large">Body large</Body>
        <Body size="medium">Body medium</Body>
        <Body size="small">Body small</Body>
        <Body noWrap>
          Default with noWrap applied // Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Officia pariatur ratione iure minus qui nesciunt
          sint maiores ipsam nostrum cum, est doloremque provident voluptas,
          doloribus excepturi atque, explicabo asperiores praesentium.
        </Body>
      </Stack>
    </Page>
  );
}
