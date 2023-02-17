interface BasePropDefinition<T> {
  alias?: string;
  description: string;
  defaultValue: T;
}

export enum PropType {
  String = "string",
  Boolean = "boolean",
  Enum = "enum",
  ReactNode = "ReactNode",
  Number = "number",
  Action = "action",
  Group = "group",
}

// Strings
interface StringPropDefinition extends BasePropDefinition<StringPropValue> {
  type: PropType.String;
}

interface StringPropValue {
  type: PropType.String;
  value: string;
}

// Booleans
interface BooleanPropDefinition extends BasePropDefinition<BooleanPropValue> {
  type: PropType.Boolean;
}

interface BooleanPropValue {
  type: PropType.Boolean;
  value: boolean;
}

// Enums
interface EnumPropDefinition extends BasePropDefinition<EnumPropValue> {
  type: PropType.Enum;
  options: string[];
}

interface EnumPropValue {
  type: PropType.Enum;
  value: string;
}

// Numbers
interface NumberPropDefinition extends BasePropDefinition<NumberPropValue> {
  type: PropType.Number;
}

interface NumberPropValue {
  type: PropType.Number;
  value: number;
}

// React nodes
interface ReactNodePropDefinition
  extends BasePropDefinition<ReactNodePropValue> {
  type: PropType.ReactNode;
}

interface ReactNodePropValue {
  type: PropType.ReactNode;
}

// Actions
interface ActionPropDefinition extends BasePropDefinition<ActionPropValue> {
  type: PropType.Action;
}

interface ActionPropValue {
  type: PropType.Action;
  value: AppAction[];
}

export enum AppActionType {
  Alert = "ALERT",
  Navigate = "NAVIGATE",
}

type AlertAppAction = {
  type: AppActionType.Alert;
  message: string;
};

type NavigateAppAction = {
  type: AppActionType.Navigate;
  viewId: string;
};

type AppAction = AlertAppAction | NavigateAppAction;

// Grouping
export interface GroupPropDefinition
  extends BasePropDefinition<GroupPropValue> {
  type: PropType.Group;
  children: {
    [key: string]: PropDefinition;
  };
}

type GroupPropValue = {
  type: PropType.Group;
  children: {
    [key: string]: PropValue;
  };
};

export type PropDefinition =
  | StringPropDefinition
  | BooleanPropDefinition
  | EnumPropDefinition
  | ReactNodePropDefinition
  | NumberPropDefinition
  | ActionPropDefinition
  | GroupPropDefinition;

export type PropValue =
  | StringPropValue
  | BooleanPropValue
  | EnumPropValue
  | ReactNodePropValue
  | NumberPropValue
  | ActionPropValue
  | GroupPropValue;

export interface View {
  id: string;
  name: string;
  selectedLayerId: string | null;
  type: "CustomComponent" | "View";
}

type LayerParent = {
  layerId: string;
  propPath: string;
};

export interface Layer {
  viewId: string;
  id: string;
  title: string;
  parent: LayerParent | null;
  component: ComponentName;
  props: {
    [id: string]: PropValue;
  };
}

// export type ComponentName = keyof typeof components;
export type ComponentName = string;

export interface AppState {
  sheets: {
    id: string;
    name: string;
    columns: {
      name: string;
      rows: {
        value: string;
        temporaryValue: string;
      }[];
    }[];
  }[];
}

export interface State {
  views: View[];
  layers: Layer[];
  hoveredLayerId: string | null;
  selectedViewId: string;
  layerAdderVisibility: LayerParent | null | false;
  appState: AppState;
}

type AddLayerAction = {
  type: "ADD_LAYER";
  parent: LayerParent | null;
  componentName: ComponentName;
};

type SelectLayerAction = {
  type: "SELECT_LAYER";
  layerId: string;
};

type SetHoveredLayerIdAction = {
  type: "SET_HOVERED_LAYER_ID";
  layerId: string | null;
};

type SetSelectedViewIdAction = {
  type: "SET_SELECTED_VIEW_ID";
  viewId: string;
};

type SetPropAction = {
  type: "SET_PROP";
  layerId: string;
  propType: PropType;
  propPath: string;
  value: any;
};

type ShowLayerAdderAction = {
  type: "SHOW_LAYER_ADDER";
  parent: LayerParent | null;
};

type HideLayerAdderAction = {
  type: "HIDE_LAYER_ADDER";
};

type UpdateAppStateAction = {
  type: "UPDATE_APP_STATE";
  sheetId: string;
  columnIndex: number;
  rowIndex: number;
  value: string;
};

export type Action =
  | SelectLayerAction
  | AddLayerAction
  | SetHoveredLayerIdAction
  | SetSelectedViewIdAction
  | SetPropAction
  | ShowLayerAdderAction
  | HideLayerAdderAction
  | UpdateAppStateAction;

export type BaseMessage = {
  source: "polaris-studio";
};

export interface MessageFromIframe extends BaseMessage {
  action: Action;
}

export interface MessageToIframe extends BaseMessage {
  state: State;
}

export interface ComponentMap {
  [key: string]: {
    reactComponent: any;
    renderPreview?: () => React.ReactNode;
    props: {
      [key: string]: PropDefinition;
    };
  };
}
