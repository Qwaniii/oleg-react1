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
function ArticleCard(props) {
    var _a, _b, _c;
    var article = props.article, onAdd = props.onAdd, t = props.t;
    var cn = (0, classname_1.cn)('ArticleCard');
    return (react_1.default.createElement("div", { className: cn() },
        react_1.default.createElement("div", { className: cn('description') }, article.description),
        react_1.default.createElement("div", { className: cn('prop') },
            react_1.default.createElement("div", { className: cn('label') }, "\u0421\u0442\u0440\u0430\u043D\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C:"),
            react_1.default.createElement("div", { className: cn('value') }, (_a = article.madeIn) === null || _a === void 0 ? void 0 :
                _a.title,
                " (", (_b = article.madeIn) === null || _b === void 0 ? void 0 :
                _b.code,
                ")")),
        react_1.default.createElement("div", { className: cn('prop') },
            react_1.default.createElement("div", { className: cn('label') }, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:"),
            react_1.default.createElement("div", { className: cn('value') }, (_c = article.category) === null || _c === void 0 ? void 0 : _c.title)),
        react_1.default.createElement("div", { className: cn('prop') },
            react_1.default.createElement("div", { className: cn('label') }, "\u0413\u043E\u0434 \u0432\u044B\u043F\u0443\u0441\u043A\u0430:"),
            react_1.default.createElement("div", { className: cn('value') }, article.edition)),
        react_1.default.createElement("div", { className: cn('prop', { size: 'big' }) },
            react_1.default.createElement("div", { className: cn('label') }, "\u0426\u0435\u043D\u0430:"),
            react_1.default.createElement("div", { className: cn('value') },
                (0, number_format_1.default)(article.price),
                " \u20BD")),
        react_1.default.createElement("button", { onClick: function () { return onAdd(article._id); } }, t('article.add'))));
}
exports.default = (0, react_1.memo)(ArticleCard);
//# sourceMappingURL=index.js.map