export type DropZoneEvent = DragEvent | React.ChangeEvent<HTMLInputElement>;

export enum Size {
  ExtraLarge = 500,
  Large = 300,
  Medium = 160,
  Small = 100,
}
export interface DropZoneContext {
  width: Size;
  height: Size;
  type: string;
}
