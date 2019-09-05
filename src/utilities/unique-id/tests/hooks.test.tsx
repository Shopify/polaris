import React from 'react';
import {mountWithApp} from 'test-utilities';
import {useUniqueId} from '../hooks';

function TestHarness({children}: {children: React.ReactNode}) {
  return <React.Fragment>{children}</React.Fragment>;
}

const Component1 = () => <React.Fragment>{useUniqueId()}</React.Fragment>;
const Component2 = () => <React.Fragment>{useUniqueId()}</React.Fragment>;
const Component3 = () => <React.Fragment>{useUniqueId()}</React.Fragment>;

const HasPrefix1 = () => <React.Fragment>{useUniqueId('a')}</React.Fragment>;
const HasPrefix2 = () => <React.Fragment>{useUniqueId('a')}</React.Fragment>;
const HasPrefix3 = () => <React.Fragment>{useUniqueId('a')}</React.Fragment>;
const HasPrefix4 = () => <React.Fragment>{useUniqueId('b')}</React.Fragment>;

describe('useUniqueId', () => {
  it('returns unique IDs across a single component', () => {
    const harness = mountWithApp(
      <TestHarness>
        <Component1 />
        <Component1 />
        <Component1 />
        <HasPrefix1 />
        <HasPrefix1 />
        <HasPrefix1 />
      </TestHarness>,
    );

    expect(harness.findAll(Component1)[0].html()).toStrictEqual('polaris-1');
    expect(harness.findAll(Component1)[1].html()).toStrictEqual('polaris-2');
    expect(harness.findAll(Component1)[2].html()).toStrictEqual('polaris-3');

    expect(harness.findAll(HasPrefix1)[0].html()).toStrictEqual('polaris-a1');
    expect(harness.findAll(HasPrefix1)[1].html()).toStrictEqual('polaris-a2');
    expect(harness.findAll(HasPrefix1)[2].html()).toStrictEqual('polaris-a3');
  });

  it('returns unique IDs across multiple components', () => {
    const harness = mountWithApp(
      <TestHarness>
        <Component1 />
        <Component2 />
        <Component3 />
        <HasPrefix1 />
        <HasPrefix2 />
        <HasPrefix3 />
        <HasPrefix4 />
      </TestHarness>,
    );

    expect(harness.find(Component1)!.html()).toStrictEqual('polaris-1');
    expect(harness.find(Component2)!.html()).toStrictEqual('polaris-2');
    expect(harness.find(Component3)!.html()).toStrictEqual('polaris-3');

    expect(harness.find(HasPrefix1)!.html()).toStrictEqual('polaris-a1');
    expect(harness.find(HasPrefix2)!.html()).toStrictEqual('polaris-a2');
    expect(harness.find(HasPrefix3)!.html()).toStrictEqual('polaris-a3');
    expect(harness.find(HasPrefix4)!.html()).toStrictEqual('polaris-b1');
  });

  it('increments multiple IDs within the same component', () => {
    const HasMultipleIds = () => (
      <React.Fragment>
        {useUniqueId()} :: {useUniqueId()}
      </React.Fragment>
    );

    const harness = mountWithApp(<HasMultipleIds />);

    expect(harness.html()).toStrictEqual('polaris-1 :: polaris-2');
  });

  it('uses an override if specified', () => {
    const HasOverride = () => (
      <React.Fragment>{useUniqueId('', 'overridden')}</React.Fragment>
    );

    const harness = mountWithApp(<HasOverride />);

    expect(harness.html()).toStrictEqual('overridden');
  });

  it('uses an override if specified and the override does not interupt the count', () => {
    const HasOverride = ({idOverride}: {idOverride?: string}) => (
      <React.Fragment>{useUniqueId('', idOverride)}</React.Fragment>
    );

    const harness = mountWithApp(
      <TestHarness>
        <HasOverride />
        <HasOverride idOverride="overridden" />
        <HasOverride />
      </TestHarness>,
    );

    expect(harness.findAll(HasOverride)[0].html()).toStrictEqual('polaris-1');
    expect(harness.findAll(HasOverride)[1].html()).toStrictEqual('overridden');
    expect(harness.findAll(HasOverride)[2].html()).toStrictEqual('polaris-2');
  });

  it('keeps the same ID across multiple rerenders', () => {
    const HasProp = ({info}: {info: string}) => (
      <React.Fragment>
        {info} :: {useUniqueId()}
      </React.Fragment>
    );

    const ReRenderingTestHarness = () => {
      const [count, setCount] = React.useState(1);
      const incrementCount = React.useCallback(
        () => setCount((count) => count + 1),
        [],
      );

      return (
        <React.Fragment>
          <button onClick={incrementCount}>Click Me</button>
          <HasProp info={`count${count}`} />
        </React.Fragment>
      );
    };

    const harness = mountWithApp(<ReRenderingTestHarness />);

    expect(harness.find(HasProp)!.html()).toStrictEqual('count1 :: polaris-1');

    harness.find('button')!.trigger('onClick');

    expect(harness.find(HasProp)!.html()).toStrictEqual('count2 :: polaris-1');
  });
});
