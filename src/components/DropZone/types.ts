export type DropZoneEvent = DragEvent | React.ChangeEvent<HTMLInputElement>;

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export enum SizeValue {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extraLarge',
}
