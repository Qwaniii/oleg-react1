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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classname_1 = require("@bem-react/classname");
var number_format_1 = __importDefault(require("../../utils/number-format"));
require("./style.css");
var react_router_dom_1 = require("react-router-dom");
function Item(props) {
    var _a = props.onAdd, onAdd = _a === void 0 ? function () { } : _a, _b = props.labelCurr, labelCurr = _b === void 0 ? '₽' : _b, _c = props.labelAdd, labelAdd = _c === void 0 ? 'Добавить' : _c, _d = props.select, select = _d === void 0 ? function () { } : _d, _e = props.modal, modal = _e === void 0 ? false : _e;
    var cn = (0, classname_1.cn)('Item');
    var callbacks = {
        onAdd: function () { return onAdd(props.item._id); },
        setSelect: function () {
            select(props.item._id);
        }
    };
    return (react_1.default.createElement("div", { className: cn("", props.item.selected ? "selected" : ""), onClick: modal ? callbacks.setSelect : function () { } },
        react_1.default.createElement("div", { className: cn('title') },
            react_1.default.createElement(react_router_dom_1.Link, { to: props.link }, props.item.title)),
        react_1.default.createElement("div", { className: cn('actions') },
            react_1.default.createElement("div", { className: cn('price') },
                (0, number_format_1.default)(props.item.price),
                " ",
                labelCurr),
            !modal && react_1.default.createElement("button", { onClick: callbacks.onAdd }, labelAdd))));
}
exports.default = (0, react_1.memo)(Item);
//# sourceMappingURL=index.js.map