import {UniqueIdFactory, globalIdGeneratorFactory} from '../unique-id-factory';

describe('UniqueIdFactory', () => {
  it('returns unique IDs across multiple calls', () => {
    const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('')).toBe('Polaris1');
    expect(uniqueIdFactory.nextId('')).toBe('Polaris2');
    expect(uniqueIdFactory.nextId('')).toBe('Polaris3');

    expect(uniqueIdFactory.nextId('A')).toBe('PolarisA1');
    expect(uniqueIdFactory.nextId('A')).toBe('PolarisA2');
    expect(uniqueIdFactory.nextId('A')).toBe('PolarisA3');
  });

  it('returns unique IDs across prefixes', () => {
    const uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('A')).toBe('PolarisA1');
    expect(uniqueIdFactory.nextId('A')).toBe('PolarisA2');
    expect(uniqueIdFactory.nextId('A')).toBe('PolarisA3');
  });

  it('can accept a custom factory', () => {
    const customIdGeneratorFactory = (prefix: string) => {
      let index = 101;
      return () => `Custom${prefix}${index++}`;
    };

    const uniqueIdFactory = new UniqueIdFactory(customIdGeneratorFactory);

    expect(uniqueIdFactory.nextId('')).toBe('Custom101');
    expect(uniqueIdFactory.nextId('')).toBe('Custom102');
    expect(uniqueIdFactory.nextId('A')).toBe('CustomA101');
  });
});
