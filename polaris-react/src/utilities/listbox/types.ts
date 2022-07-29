export interface NavigableOption {
  domId: string;
  value: string;
  element: HTMLElement;
  disabled: boolean;
  isAction?: boolean;
  index?: number;
}
