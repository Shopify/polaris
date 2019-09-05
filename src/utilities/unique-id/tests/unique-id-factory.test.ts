import {UniqueIdFactory, globalIdGeneratorFactory} from '../unique-id-factory';

describe('UniqueIdFactory', () => {
  it('returns unique IDs across multiple calls', () => {
    const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('')).toStrictEqual('polaris-1');
    expect(uniqueIdFactory.nextId('')).toStrictEqual('polaris-2');
    expect(uniqueIdFactory.nextId('')).toStrictEqual('polaris-3');

    expect(uniqueIdFactory.nextId('a')).toStrictEqual('polaris-a1');
    expect(uniqueIdFactory.nextId('a')).toStrictEqual('polaris-a2');
    expect(uniqueIdFactory.nextId('a')).toStrictEqual('polaris-a3');
  });

  it('returns unique IDs across prefixes', () => {
    const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('a')).toStrictEqual('polaris-a1');
    expect(uniqueIdFactory.nextId('a')).toStrictEqual('polaris-a2');
    expect(uniqueIdFactory.nextId('a')).toStrictEqual('polaris-a3');
  });

  it('can accept a custom factory', () => {
    const customIdGeneratorFactory = (prefix: string) => {
      let index = 101;
      return () => `custom-${prefix}${index++}`;
    };

    const uniqueIdFactory = new UniqueIdFactory(customIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('')).toStrictEqual('custom-101');
    expect(uniqueIdFactory.nextId('')).toStrictEqual('custom-102');
    expect(uniqueIdFactory.nextId('a')).toStrictEqual('custom-a101');
  });
});
