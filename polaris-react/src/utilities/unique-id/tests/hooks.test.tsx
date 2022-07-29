import type {ReactNode} from 'react';
import {useState, useCallback} from 'react';
import {mountWithApp} from 'tests/utilities';

import {useUniqueId} from '../hooks';

function TestHarness({children}: {children: ReactNode}) {
  return <>{children}</>;
}

const Component1 = () => <div id={useUniqueId()} />;
const Component2 = () => <div id={useUniqueId()} />;
const Component3 = () => <div id={useUniqueId()} />;

const HasPrefix1 = () => <div id={useUniqueId('A')} />;
const HasPrefix2 = () => <div id={useUniqueId('A')} />;
const HasPrefix3 = () => <div id={useUniqueId('A')} />;
const HasPrefix4 = () => <div id={useUniqueId('B')} />;

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

    expect(harness.findAll('div')[0]).toHaveReactProps({id: 'Polaris1'});
    expect(harness.findAll('div')[1]).toHaveReactProps({id: 'Polaris2'});
    expect(harness.findAll('div')[2]).toHaveReactProps({id: 'Polaris3'});
    expect(harness.findAll('div')[3]).toHaveReactProps({id: 'PolarisA1'});
    expect(harness.findAll('div')[4]).toHaveReactProps({id: 'PolarisA2'});
    expect(harness.findAll('div')[5]).toHaveReactProps({id: 'PolarisA3'});
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

    expect(harness.findAll('div')[0]).toHaveReactProps({id: 'Polaris1'});
    expect(harness.findAll('div')[1]).toHaveReactProps({id: 'Polaris2'});
    expect(harness.findAll('div')[2]).toHaveReactProps({id: 'Polaris3'});
    expect(harness.findAll('div')[3]).toHaveReactProps({id: 'PolarisA1'});
    expect(harness.findAll('div')[4]).toHaveReactProps({id: 'PolarisA2'});
    expect(harness.findAll('div')[5]).toHaveReactProps({id: 'PolarisA3'});
    expect(harness.findAll('div')[6]).toHaveReactProps({id: 'PolarisB1'});
  });

  it('increments multiple IDs within the same component', () => {
    const HasMultipleIds = () => (
      <div id={useUniqueId()} title={useUniqueId()} />
    );

    const harness = mountWithApp(<HasMultipleIds />);

    expect(harness.find('div')).toHaveReactProps({
      id: 'Polaris1',
      title: 'Polaris2',
    });
  });

  it('uses an override if specified', () => {
    const HasOverride = () => <div id={useUniqueId('', 'overridden')} />;

    const harness = mountWithApp(<HasOverride />);

    expect(harness.find('div')).toHaveReactProps({id: 'overridden'});
  });

  it('uses an override if specified and the override does not interrupt the count', () => {
    const HasOverride = ({idOverride}: {idOverride?: string}) => (
      <div id={useUniqueId('', idOverride)} />
    );

    const harness = mountWithApp(
      <TestHarness>
        <HasOverride />
        <HasOverride idOverride="overridden" />
        <HasOverride />
      </TestHarness>,
    );

    expect(harness.findAll('div')[0]).toHaveReactProps({id: 'Polaris1'});
    expect(harness.findAll('div')[1]).toHaveReactProps({id: 'overridden'});
    expect(harness.findAll('div')[2]).toHaveReactProps({id: 'Polaris2'});
  });

  it('keeps the same ID across multiple rerenders', () => {
    const HasProp = ({info}: {info: string}) => (
      <div id={useUniqueId()} title={info} />
    );

    const ReRenderingTestHarness = () => {
      const [count, setCount] = useState(1);
      const incrementCount = useCallback(
        () => setCount((count) => count + 1),
        [],
      );

      return (
        <>
          <button onClick={incrementCount}>Click Me</button>
          <HasProp info={`count${count}`} />
        </>
      );
    };

    const harness = mountWithApp(<ReRenderingTestHarness />);

    expect(harness.findAll('div')[0]).toHaveReactProps({
      title: 'count1',
      id: 'Polaris1',
    });

    harness.find('button')!.trigger('onClick');

    expect(harness.findAll('div')[0]).toHaveReactProps({
      title: 'count2',
      id: 'Polaris1',
    });
  });

  it('updates the ID if the overridden ID changes', () => {
    interface HasPropProps {
      info: string;
      idOverride?: string;
    }
    const HasProp = ({info, idOverride}: HasPropProps) => (
      <div id={useUniqueId('', idOverride)} title={info} />
    );

    const ReRenderingTestHarness = () => {
      const [count, setCount] = useState(1);
      const incrementCount = useCallback(
        () => setCount((count) => count + 1),
        [],
      );

      const override = count % 2 === 0 ? `Override${count}` : undefined;

      return (
        <>
          <button onClick={incrementCount}>Click Me</button>
          <HasProp info={`count${count}`} idOverride={override} />
        </>
      );
    };

    const harness = mountWithApp(<ReRenderingTestHarness />);

    // Initially we use an incremental id
    expect(harness.find('div')).toHaveReactProps({
      title: 'count1',
      id: 'Polaris1',
    });

    // But then we set an override id, so it should use that
    harness.find('button')!.trigger('onClick');
    expect(harness.find('div')).toHaveReactProps({
      title: 'count2',
      id: 'Override2',
    });

    // Then on the next render we don't set an override id, so we should go back
    // to using the incremental id
    harness.find('button')!.trigger('onClick');
    expect(harness.find('div')).toHaveReactProps({
      title: 'count3',
      id: 'Polaris1',
    });

    // Back to setting an override id
    harness.find('button')!.trigger('onClick');
    expect(harness.find('div')).toHaveReactProps({
      title: 'count4',
      id: 'Override4',
    });

    // Back to not setting an override, so back to using the incremental id
    harness.find('button')!.trigger('onClick');
    expect(harness.find('div')).toHaveReactProps({
      title: 'count5',
      id: 'Polaris1',
    });
  });
});
