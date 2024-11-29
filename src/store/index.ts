import * as modules from './exports.js';
import { ModulesActions, ModulesState, StoreConfig } from './types/store/index.js';





export type StoreState = {
  services: any,
  config: StoreConfig,
  listeners: Array<(state: ModulesState) => void>,
  state: ModulesState,
  actions: ModulesActions,
  create: (name: string, newName: string) => void,
  subscribe: (listener: () => {}) => () => void,
  getState: () => ModulesState,
  setState: (newState: ModulesState, description: string) => void
}

/**
 * Хранилище состояния приложения
 */
class Store implements StoreState {
  services: any; 
  config: StoreConfig;
  listeners: ((state: ModulesState) => void)[];
  state: ModulesState;
  actions: ModulesActions;
  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services, config = {} as StoreConfig, initState: ModulesState = {} as ModulesState) {
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
    this.actions = {} as ModulesActions;
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name, this.config?.modules[name] || {});
      this.state[name] = this.actions[name].initState();
    }
  }

  create( newName, baseState) {
    this.actions[newName] = new modules[baseState](this, newName, this.config?.modules[newName] || {});
    this.state[newName] = this.actions[newName].initState();

    return () => {
      delete this.actions[newName];
      delete this.state[newName];

    }
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

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
  getState(): ModulesState {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, description = 'setState') {
    if (this.config.log) {
      console.group(
        `%c${'store.setState'} %c${description}`,
        `color: ${'#777'}; font-weight: normal`,
        `color: ${'#333'}; font-weight: bold`,
      );
      console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
      console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
      console.groupEnd();
    }
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }
}

export default Store;
