export type DropZoneEvent = DragEvent | React.ChangeEvent<HTMLInputElement>;

export interface DropZoneContext {
  size: string;
  type: string;
}
