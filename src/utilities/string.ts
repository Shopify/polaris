export function preventOrphans(stringValue: string) {
  const newStringArray: string[] = [];
  const stringArray = stringValue.split(' ');
  if (stringArray.length === 1) {
    return stringValue;
  }

  for (let i = 0; i < stringArray.length - 1; i++) {
    if (i === stringArray.length - 2) {
      newStringArray.push(
        stringArray[i] + String.fromCharCode(160) + stringArray[i + 1],
      );
    } else {
      newStringArray.push(stringArray[i]);
    }
  }
  return newStringArray.join(' ');
}
