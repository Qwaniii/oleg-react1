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
function Pagination(props) {
    var _a = props.page, page = _a === void 0 ? 1 : _a, _b = props.limit, limit = _b === void 0 ? 10 : _b, _c = props.count, count = _c === void 0 ? 1000 : _c, _d = props.indent, indent = _d === void 0 ? 1 : _d;
    // Количество страниц
    var length = Math.ceil(count / Math.max(limit, 1));
    // Номера слева и справа относительно активного номера, которые остаются видимыми
    var left = Math.max(props.page - indent, 1);
    var right = Math.min(left + indent * 2, length);
    // Корректировка когда страница в конце
    left = Math.max(right - indent * 2, 1);
    // Массив номеров, чтобы удобней рендерить
    var items = [];
    // Первая страница всегда нужна
    if (left > 1)
        items.push(1);
    // Пропуск
    if (left > 2)
        items.push(null);
    // Последовательность страниц
    for (var pageNumber = left; pageNumber <= right; pageNumber++)
        items.push(pageNumber);
    // Пропуск
    if (right < length - 1)
        items.push(null);
    // Последняя страница
    if (right < length)
        items.push(length);
    var onClickHandler = function (number) { return function (e) {
        if (props.onChange && number) {
            e.preventDefault();
            props.onChange(number);
        }
    }; };
    var cn = (0, classname_1.cn)('Pagination');
    return (react_1.default.createElement("ul", { className: cn() }, items.map(function (number, index) { return (react_1.default.createElement("li", { key: index, className: cn('item', { active: number === page, split: !number }), onClick: onClickHandler(number) }, number ? props.makeLink ? react_1.default.createElement("a", { href: props.makeLink(number) }, number) : number : '...')); })));
}
exports.default = (0, react_1.memo)(Pagination);
//# sourceMappingURL=index.js.map