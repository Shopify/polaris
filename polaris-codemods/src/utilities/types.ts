// https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABDAzgaQKYE8DywA8AKohgB5QZgAmKicARgFYbQB8AFA4wFyKEA0iANbYA-LwCGYLAEpeIrMloK4wPogDeAKESIAThigg9SHExZQAdAAc9cKPazWMlgBYSUOAO5gACnec9KCxLCAkAG3DOJkEFRA9EfzhA4MxZLQBfLS0IBBQoOiZEAF5NRGA4OF4AcnoJPWrBACZeKD0QDEQM+NpcsHycvIKFXnAhMDgfEsRq6uyuAG0FAF1smDV2VDS8aMZY7BkZTR1hbBOAenPEAD1RbN0+-MQANwiO6cWVi6vdG7usoA
export function isKeyOf<T extends object>(
  obj: T,
  key?: unknown,
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key as PropertyKey);
}

export interface TransformInfo {
  extensions: string[];
  options: {
    [key: string]: TransformInfoOption;
  };
}

export type TransformInfoExtensions = TransformInfo['extensions'];
export type TransformInfoOptions = TransformInfo['options'];

export interface TransformInfoOption {
  name: string;
  type: 'string' | 'boolean';
  description: string;
  required?: boolean;
}
