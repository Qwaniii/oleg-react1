"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
var StoreModule = /** @class */ (function () {
    /**
     * @param store {Store}
     * @param name {String}
     * @param [config] {Object}
     */
    function StoreModule(store, name, config) {
        if (config === void 0) { config = {}; }
        this.store = store;
        this.name = name;
        this.config = config;
        /** @type {Services} */
        this.services = store.services;
    }
    StoreModule.prototype.initState = function () {
        return {};
    };
    StoreModule.prototype.getState = function () {
        return this.store.getState()[this.name];
    };
    StoreModule.prototype.setState = function (newState, description) {
        var _a;
        if (description === void 0) { description = 'setState'; }
        this.store.setState(__assign(__assign({}, this.store.getState()), (_a = {}, _a[this.name] = newState, _a)), description);
    };
    return StoreModule;
}());
exports.default = StoreModule;
//# sourceMappingURL=module.js.map