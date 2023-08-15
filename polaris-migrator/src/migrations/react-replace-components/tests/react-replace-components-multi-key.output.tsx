import React from 'react';
import {Text, VerticalStack} from '@shopify/polaris';

const words = ['hello', 'world'];

export function App() {
  return (
    <VerticalStack gap="5">
      {words.map((word) => (
        <Text key={word} as="p" variant="bodyLg">
          {word}
        </Text>
      ))}
    </VerticalStack>
  );
}
