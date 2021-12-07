type IdGenerator = () => string;
type IdGeneratorFactory = (prefix: string) => IdGenerator;

export class UniqueIdFactory {
  private idGeneratorFactory: IdGeneratorFactory;

  private idGenerators: {[key: string]: IdGenerator} = {};

  constructor(idGeneratorFactory: IdGeneratorFactory) {
    this.idGeneratorFactory = idGeneratorFactory;
  }

  nextId(prefix: string) {
    if (!this.idGenerators[prefix]) {
      this.idGenerators[prefix] = this.idGeneratorFactory(prefix);
    }

    return this.idGenerators[prefix]();
  }
}

export function globalIdGeneratorFactory(prefix = '') {
  let index = 1;
  return () => `Polaris${prefix}${index++}`;
}
