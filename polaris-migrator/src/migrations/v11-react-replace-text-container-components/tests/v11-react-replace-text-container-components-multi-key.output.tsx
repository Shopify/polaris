import React from 'react';
import {Text, AlphaStack} from '@shopify/polaris';

const words = ['hello', 'world'];

export function App() {
  return (
    <AlphaStack gap="5">
      {words.map((word) => (
        <Text key={word} as="p" variant="bodyLg">
          {word}
        </Text>
      ))}
    </AlphaStack>
  );
}
