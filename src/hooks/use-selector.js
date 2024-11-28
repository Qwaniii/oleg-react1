"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSelector;
var react_1 = require("react");
var shallowequal_1 = __importDefault(require("shallowequal"));
var use_store_1 = __importDefault(require("./use-store"));
/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selectorFunc {Function}
 * @return {*}
 */
function useSelector(selectorFunc) {
    var store = (0, use_store_1.default)();
    var _a = (0, react_1.useState)(function () { return selectorFunc(store.getState()); }), state = _a[0], setState = _a[1];
    var unsubscribe = (0, react_1.useMemo)(function () {
        // Подписка. Возврат функции для отписки
        return store.subscribe(function () {
            var newState = selectorFunc(store.getState());
            setState(function (prevState) { return ((0, shallowequal_1.default)(prevState, newState) ? prevState : newState); });
        });
    }, []); // Нет зависимостей - исполнится один раз
    // Отписка от store при демонтировании компонента
    (0, react_1.useEffect)(function () { return unsubscribe; }, [unsubscribe]);
    return state;
}
//# sourceMappingURL=use-selector.js.map