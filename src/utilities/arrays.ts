export interface ArrayComparator<T> {
  (firstArray: T, SecondArray: T): boolean;
}

export function arraysAreEqual<T>(
  firstArray: T[],
  secondArray: T[],
  comparator?: ArrayComparator<T>,
) {
  if (firstArray.length !== secondArray.length) {
    return false;
  }
  return firstArray.every((firstItem, index) => {
    const secondItem = secondArray[index];
    if (comparator != null) {
      return comparator(firstItem, secondItem);
    }
    return firstItem === secondItem;
  });
}
