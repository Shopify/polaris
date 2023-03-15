import {LegacyStack} from '@shopify/polaris';

const MyStack = LegacyStack;

export function App() {
  return (
    <>
      <div className={styles.Stack}>hello</div>
      <LegacyStack>hello</LegacyStack>
      <MyStack>hello</MyStack>
      <LegacyStack>
        <LegacyStack.Header>hello</LegacyStack.Header>
        <LegacyStack.Section>hello</LegacyStack.Section>
        <LegacyStack.Subsection>world</LegacyStack.Subsection>
      </LegacyStack>
    </>
  );
}
