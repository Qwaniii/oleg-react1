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
var modules = __importStar(require("./exports.js"));
/**
 * Хранилище состояния приложения
 */
var Store = /** @class */ (function () {
    /**
     * @param services {Services}
     * @param config {Object}
     * @param initState {Object}
     */
    function Store(services, config, initState) {
        if (config === void 0) { config = {}; }
        if (initState === void 0) { initState = {}; }
        var _a;
        this.services = services;
        this.config = config;
        this.listeners = []; // Слушатели изменений состояния
        this.state = initState;
        /** @type {{
         * basket: BasketState,
         * catalog: CatalogState,
         * modals: ModalsState,
         * article: ArticleState,
         * locale: LocaleState,
         * categories: CategoriesState,
         * session: SessionState,
         * profile: ProfileState
         * }} */
        this.actions = {};
        for (var _i = 0, _b = Object.keys(modules); _i < _b.length; _i++) {
            var name_1 = _b[_i];
            this.actions[name_1] = new modules[name_1](this, name_1, ((_a = this.config) === null || _a === void 0 ? void 0 : _a.modules[name_1]) || {});
            this.state[name_1] = this.actions[name_1].initState();
        }
    }
    Store.prototype.create = function (newName, baseState) {
        var _a;
        this.actions[newName] = new modules[baseState](this, newName, ((_a = this.config) === null || _a === void 0 ? void 0 : _a.modules[newName]) || {});
        this.state[newName] = this.actions[newName].initState();
    };
    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    Store.prototype.subscribe = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return function () {
            _this.listeners = _this.listeners.filter(function (item) { return item !== listener; });
        };
    };
    /**
     * Выбор состояния
     * @returns {{
     * basket: Object,
     * catalog: Object,
     * modals: Object,
     * article: Object,
     * locale: Object,
     * categories: Object,
     * session: Object,
     * profile: Object,
     * }}
     */
    Store.prototype.getState = function () {
        return this.state;
    };
    /**
     * Установка состояния
     * @param newState {Object}
     */
    Store.prototype.setState = function (newState, description) {
        if (description === void 0) { description = 'setState'; }
        if (this.config.log) {
            console.group("%c".concat('store.setState', " %c").concat(description), "color: ".concat('#777', "; font-weight: normal"), "color: ".concat('#333', "; font-weight: bold"));
            console.log("%c".concat('prev:'), "color: ".concat('#d77332'), this.state);
            console.log("%c".concat('next:'), "color: ".concat('#2fa827'), newState);
            console.groupEnd();
        }
        this.state = newState;
        // Вызываем всех слушателей
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this.state);
        }
    };
    return Store;
}());
exports.default = Store;
//# sourceMappingURL=index.js.map