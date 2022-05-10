export type Token = {
  id: string;
  name: string;
  figmaName: string;
  value: RGBA;
};

type LintedLayerColorInfo = {
  isToken?: boolean;
  color: RGBA;
  closestToken?: Token;
};
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

type TokenMapPluginMessage = {
  type: 'linted-layer-list';
  data: {
    lintedLayers: LintedLayer[];
  };
};

type TotalLayerCountPluginMessage = {
  type: 'total-layer-count';
  data: {
    totalLayerCount: number;
  };
};

type LayerCountPluginMessage = {
  type: 'linted-layer-count';
  data: {
    layerCount: number;
  };
};

export type PluginMessage =
  | TokenMapPluginMessage
  | TotalLayerCountPluginMessage
  | LayerCountPluginMessage;
