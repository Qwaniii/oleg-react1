import APIService from './api/index.js';
import Store, { StoreState } from './store/index.ts';
import createStoreRedux from './store-redux/index.js';
import { APIServiceProps, StoreConfig } from './store/types/store/index.ts';



class Services {

  config: StoreConfig
  _api: APIServiceProps
  _store:  StoreState
  _redux: any

  constructor(config: StoreConfig) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   */
  
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
}

export default Services;
