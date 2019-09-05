import {UniqueIdFactory, globalIdGeneratorFactory} from '../unique-id-factory';

describe('UniqueIdFactory', () => {
  it('returns unique IDs across multiple calls', () => {
    const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('')).toStrictEqual('Polaris1');
    expect(uniqueIdFactory.nextId('')).toStrictEqual('Polaris2');
    expect(uniqueIdFactory.nextId('')).toStrictEqual('Polaris3');

    expect(uniqueIdFactory.nextId('A')).toStrictEqual('PolarisA1');
    expect(uniqueIdFactory.nextId('A')).toStrictEqual('PolarisA2');
    expect(uniqueIdFactory.nextId('A')).toStrictEqual('PolarisA3');
  });

  it('returns unique IDs across prefixes', () => {
    const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('A')).toStrictEqual('PolarisA1');
    expect(uniqueIdFactory.nextId('A')).toStrictEqual('PolarisA2');
    expect(uniqueIdFactory.nextId('A')).toStrictEqual('PolarisA3');
  });

  it('can accept a custom factory', () => {
    const customIdGeneratorFactory = (prefix: string) => {
      let index = 101;
      return () => `Custom${prefix}${index++}`;
    };

    const uniqueIdFactory = new UniqueIdFactory(customIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('')).toStrictEqual('Custom101');
    expect(uniqueIdFactory.nextId('')).toStrictEqual('Custom102');
    expect(uniqueIdFactory.nextId('A')).toStrictEqual('CustomA101');
  });
});
