export function isNumeric(dataType: string): boolean {
  return (
    dataType === 'number' ||
    dataType === 'price' ||
    dataType === 'duration' ||
    dataType === 'percent' ||
    dataType === 'float'
  );
}
