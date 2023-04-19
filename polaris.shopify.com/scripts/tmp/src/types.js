"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusName = exports.Breakpoints = exports.searchResultCategories = void 0;
exports.searchResultCategories = [
    'foundations',
    'components',
    'patterns',
    'tokens',
    'icons',
];
var Breakpoints;
(function (Breakpoints) {
    Breakpoints[Breakpoints["Mobile"] = 500] = "Mobile";
    Breakpoints[Breakpoints["Tablet"] = 768] = "Tablet";
    Breakpoints[Breakpoints["Desktop"] = 1400] = "Desktop";
    Breakpoints[Breakpoints["DesktopLarge"] = 1600] = "DesktopLarge";
})(Breakpoints = exports.Breakpoints || (exports.Breakpoints = {}));
var StatusName;
(function (StatusName) {
    StatusName["New"] = "New";
    StatusName["Deprecated"] = "Deprecated";
    StatusName["Alpha"] = "Alpha";
    StatusName["Beta"] = "Beta";
    StatusName["Information"] = "Information";
    StatusName["Legacy"] = "Legacy";
    StatusName["Warning"] = "Warning";
})(StatusName = exports.StatusName || (exports.StatusName = {}));
