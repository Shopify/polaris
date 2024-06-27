export enum AppCardActionEnum {
  Install = 'install',
  Open = 'open',
}

export interface AppCardActionType {
  type: AppCardActionEnum;
  disabled?: boolean;
  onAction?: () => void;
  loading?: boolean;
}

export type AppCardActionVariant = 'default' | 'narrow' | 'full';

export type AppCardActionSize = 'micro' | 'slim' | 'medium' | 'large';
