export function capitalize(word = '', forceOtherLettersLowercase = false) {
  let newWord = forceOtherLettersLowercase ? word.toLowerCase() : word;
  return newWord.charAt(0).toUpperCase() + newWord.slice(1);
}
