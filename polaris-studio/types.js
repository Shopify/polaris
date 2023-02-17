"use strict";
exports.__esModule = true;
exports.AppActionType = exports.PropType = void 0;
var PropType;
(function (PropType) {
    PropType["String"] = "string";
    PropType["Boolean"] = "boolean";
    PropType["Enum"] = "enum";
    PropType["ReactNode"] = "ReactNode";
    PropType["Number"] = "number";
    PropType["Action"] = "action";
    PropType["Group"] = "group";
})(PropType = exports.PropType || (exports.PropType = {}));
var AppActionType;
(function (AppActionType) {
    AppActionType["Alert"] = "ALERT";
    AppActionType["Navigate"] = "NAVIGATE";
})(AppActionType = exports.AppActionType || (exports.AppActionType = {}));
