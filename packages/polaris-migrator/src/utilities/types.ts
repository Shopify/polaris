// https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDAzgaQKYE8DywA8AKohgB5QZgAmKicARgFYbQB8AFA4wFyKEA0iANbYA-LwCGYLAEpeIrMloK4wPogDeAKESIAThigg9SHExZQAdAAc9cKPazWMlgBYSUOAO5gACnec9KCxLCAkAG3DOJkEFRA9EfzhA4MxZLQBfLS0IBBQoOiZEAF5NRGA4OF4AcnoJPWrBACZeKD0QDEQM+NpcsHycvIKFXnAhMDgfEsRq6uyuAG0FAF1smDV2VDS8aMZY7BkZTR1hbBOAenPEAD1RbN0+-MQANwiO6cWVi6vdG7usoA
export function isKeyOf<T extends object>(
  obj: T,
  key?: unknown,
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key as PropertyKey);
}

export type AlphabetUppercase =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type AlphabetLowercase =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type Alias = AlphabetLowercase | AlphabetUppercase;
