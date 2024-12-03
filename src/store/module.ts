import Store from '../store/index.ts';
import Services from '../services'
import { ServicesType, StoreConfig } from './types/store/index.ts';


/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
class StoreModule  {
  name: string;
  store: Store;
  services: ServicesType;
  config: StoreConfig

  constructor(store: Store, name: string, config: StoreConfig) {
    this.store = store;
    this.name = name;
    this.config = config;
    this.services = store.services;
  }

  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.name];
  }

  setState(newState, description: string = 'setState') {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.name]: newState,
      },
      description,
    );
  }
}

export default StoreModule;
