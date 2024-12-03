import StoreModule from '../module.ts';
import exclude from '../../utils/exclude/index.js';

export type ParamsProps = {
    page?: number,
    limit?: number,
    sort?: string,
    query?: string,
    category?: string,
}

export type InitProps = {
  saveParams: boolean,
  newParams: ParamsProps
}

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  saveParams: boolean

  /**
   * Начальное состояние
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: '',
      },
      count: 0,
      waiting: false,
      additionally: []
    };
  }

  // Установка метки каталога из модального окна

  setInner() {
      // Установка новых параметров и признака загрузки
      this.setState(
        {
          ...this.getState(),
          inner: !this.getState().inner
        },
        'Каталог внутри модального окна',
      );
  }

  

  // duplicate() {
  //   return new CatalogState({...this.getState()})
  // }

  setSelect(id: string | number) {
    this.setState({
      ...this.getState(),
      list: this.getState().list.map(item => {
        if (item._id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item
    })
  })
}

clearSelect() {
  this.setState({
    ...this.getState(),
    list: this.getState().list.map(item => {
        return {
          ...item,
          selected: false,
        };
  })
})
}

  addId(id: string | number) {
    const exist = this.getState().additionally.find(item => item === id)
    this.setState({
      ...this.getState(),
      additionally: exist ? this.getState().additionally.filter(item => item !==id) : [...this.getState().additionally, id]
  })
  }


  clearId() {
    this.setState({
      ...this.getState(),
      additionally: []
    })
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {} as ParamsProps, saveParams: boolean = true): Promise<void> {
    this.saveParams = saveParams
    const urlParams = new URLSearchParams(window.location.search);
    let validParams: ParamsProps = {};
    if (saveParams) {
      if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
      if (urlParams.has('limit'))
        validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
      if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
      if (urlParams.has('query')) validParams.query = urlParams.get('query');
      if (urlParams.has('category')) validParams.category = urlParams.get('category');
    }
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true, saveParams);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams: ParamsProps = {}, replaceHistory: boolean = false, saveParams: boolean = true):  Promise<void> {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    if(saveParams){
    let urlSearch = new URLSearchParams(exclude(params, this.initState().params)).toString();

    const url =
      window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }

    const apiParams = exclude(
      {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: 'items(*),count',
        sort: params.sort,
        'search[query]': params.query,
        'search[category]': params.category,
      },
      {
        skip: 0,
        'search[query]': '',
        'search[category]': '',
      },
    );

    const res = await this.services.api.request({
      url: `/api/v1/articles?${new URLSearchParams(apiParams)}`,
    });
    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
        count: res.data.result.count,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
    );
  }
}

export default CatalogState;
