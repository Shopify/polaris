export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface PrimitiveReplacementDictionary {
  [key: string]: string | number;
}

export interface ComplexReplacementDictionary {
  [key: string]: string | number | React.ReactNode;
}
