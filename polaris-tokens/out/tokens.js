"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = exports.osColorSchemes = void 0;
const depth_json_1 = __importDefault(require("./token-groups/depth.json"));
const legacy_tokens_json_1 = __importDefault(require("./token-groups/legacy-tokens.json"));
const color_dark_json_1 = __importDefault(require("./token-groups/color.dark.json"));
const color_light_json_1 = __importDefault(require("./token-groups/color.light.json"));
const motion_json_1 = __importDefault(require("./token-groups/motion.json"));
const shape_json_1 = __importDefault(require("./token-groups/shape.json"));
const spacing_json_1 = __importDefault(require("./token-groups/spacing.json"));
const typography_json_1 = __importDefault(require("./token-groups/typography.json"));
const z_index_json_1 = __importDefault(require("./token-groups/z-index.json"));
const utilities_1 = require("./utilities");
exports.osColorSchemes = {
    light: 'light',
    dark: 'dark',
};
const colorSchemes = {
    light: color_light_json_1.default,
    dark: color_dark_json_1.default,
};
exports.tokens = {
    colorSchemes,
    depth: depth_json_1.default,
    legacyTokens: (0, utilities_1.tokensToRems)(legacy_tokens_json_1.default),
    motion: motion_json_1.default,
    shape: (0, utilities_1.tokensToRems)(shape_json_1.default),
    spacing: (0, utilities_1.tokensToRems)(spacing_json_1.default),
    typography: (0, utilities_1.tokensToRems)(typography_json_1.default),
    zIndex: z_index_json_1.default,
};
//# sourceMappingURL=tokens.js.map