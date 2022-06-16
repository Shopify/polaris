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
        <Display size="large">Display large</Display>
        <Display size="medium" fontWeight="bold">
          Display medium with fontWeight bold
        </Display>
        <Display size="medium">Display medium</Display>
        <Display size="small">Display small</Display>
        <Display>Display default</Display>
        <Heading size="xlarge" fontWeight="bold">
          Heading xlarge with fontWeight bold
        </Heading>
        <Heading size="xlarge">Heading xlarge</Heading>
        <Heading size="large">Heading large</Heading>
        <Heading size="medium">Heading medium</Heading>
        <Heading noWrap>
          Heading default with noWrap // Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Officia pariatur ratione iure minus qui nesciunt
          sint maiores ipsam nostrum cum, est doloremque provident voluptas,
          doloribus excepturi atque, explicabo asperiores praesentium.
        </Heading>
        <Heading size="small">Heading small</Heading>
        <Body size="large" fontWeight="medium">
          Body large with fontWeight medium
        </Body>
        <Body size="large">Body large</Body>
        <Body size="medium">Body medium</Body>
        <Body size="small">Body small</Body>
        <Body noWrap>
          Body default with noWrap // Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Officia pariatur ratione iure minus qui nesciunt
          sint maiores ipsam nostrum cum, est doloremque provident voluptas,
          doloribus excepturi atque, explicabo asperiores praesentium.
        </Body>
      </Stack>
    </Page>
  );
}
