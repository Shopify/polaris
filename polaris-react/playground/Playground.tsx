import React from 'react';

import {AlphaCard, AlphaStack, Image, Text, Page, Inline} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <AlphaCard>
        <Inline gap="4">
          <Image
            alt=""
            source="https://images.unsplash.com/photo-1678729465418-ee8127e8c5cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
            height={500}
          />
          <AlphaStack align="space-evenly">
            <AlphaStack gap="1">
              <Text as="p" variant="headingSm">
                Step 1
              </Text>
              <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </Text>
            </AlphaStack>
            <AlphaStack gap="1">
              <Text as="p" variant="headingSm">
                Step 2
              </Text>
              <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </Text>
            </AlphaStack>
            <AlphaStack gap="1">
              <Text as="p" variant="headingSm">
                Step 3
              </Text>
              <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </Text>
            </AlphaStack>
          </AlphaStack>
        </Inline>
      </AlphaCard>
    </Page>
  );
}
