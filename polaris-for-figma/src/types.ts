import '@figma/plugin-typings';

export interface Token {
  id: string;
  name: string;
  figmaName: string;
  value: RGBA;
}

interface LintedLayerColorInfo {
  isToken?: boolean;
  color: RGBA;
  closestToken?: Token;
}
export interface LintedLayer {
  id: string;
  name: string;
  fill?: LintedLayerColorInfo;
  stroke?: LintedLayerColorInfo;
}

interface ScanPageUIMessage {
  type: 'lint-layers';
}

interface ReplaceAllUIMessage {
  type: 'replace-all';
}

interface ReplaceFillUIMessage {
  type: 'replace-fill';
  id: string;
}

interface ReplaceStrokeUIMessage {
  type: 'replace-stroke';
  id: string;
}

interface SelectedLayerUIMessage {
  type: 'selected-layer';
  id: string;
}

export type UIMessage =
  | ScanPageUIMessage
  | ReplaceAllUIMessage
  | ReplaceFillUIMessage
  | ReplaceStrokeUIMessage
  | SelectedLayerUIMessage;

export interface UIMessagePayload {
  pluginMessage: UIMessage;
}

interface TokenMapPluginMessage {
  type: 'linted-layer-list';
  data: {
    lintedLayers: LintedLayer[];
  };
}

interface TotalLayerCountPluginMessage {
  type: 'total-layer-count';
  data: {
    totalLayerCount: number;
  };
}

interface LayerCountPluginMessage {
  type: 'linted-layer-count';
  data: {
    layerCount: number;
  };
}

export type PluginMessage =
  | TokenMapPluginMessage
  | TotalLayerCountPluginMessage
  | LayerCountPluginMessage;
