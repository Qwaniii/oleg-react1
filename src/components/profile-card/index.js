"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classname_1 = require("@bem-react/classname");
require("./style.css");
function ProfileCard(_a) {
    var _b, _c;
    var data = _a.data;
    var cn = (0, classname_1.cn)('ProfileCard');
    return (react_1.default.createElement("div", { className: cn() },
        react_1.default.createElement("h3", { className: cn('title') }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"),
        react_1.default.createElement("div", { className: cn('prop') },
            react_1.default.createElement("div", { className: cn('label') }, "\u0418\u043C\u044F:"),
            react_1.default.createElement("div", { className: cn('value') }, (_b = data === null || data === void 0 ? void 0 : data.profile) === null || _b === void 0 ? void 0 : _b.name)),
        react_1.default.createElement("div", { className: cn('prop') },
            react_1.default.createElement("div", { className: cn('label') }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D:"),
            react_1.default.createElement("div", { className: cn('value') }, (_c = data === null || data === void 0 ? void 0 : data.profile) === null || _c === void 0 ? void 0 : _c.phone)),
        react_1.default.createElement("div", { className: cn('prop') },
            react_1.default.createElement("div", { className: cn('label') }, "email:"),
            react_1.default.createElement("div", { className: cn('value') }, data === null || data === void 0 ? void 0 : data.email))));
}
exports.default = (0, react_1.memo)(ProfileCard);
//# sourceMappingURL=index.js.map