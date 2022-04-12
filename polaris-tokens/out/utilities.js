"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokensToRems = void 0;
const BASE_FONT_SIZE = 16;
function rem(value) {
    return value.replace(
    // https://regex101.com/r/RBL7EE/1
    /\d+(?:\.\d+|\d*)px/g, (px) => `${parseInt(px, 10) / BASE_FONT_SIZE}rem`);
}
function tokensToRems(tokenGroup) {
    return Object.fromEntries(Object.entries(tokenGroup).map(([token, value]) => [token, rem(value)]));
}
exports.tokensToRems = tokensToRems;
//# sourceMappingURL=utilities.js.map