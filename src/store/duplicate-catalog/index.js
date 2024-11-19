import StoreModule from '../module';
import exclude from '../../utils/exclude';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class DuplicateCatalog extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
    };
  }

  setSelect(id) {
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

  addId(id) {
    this.setState({
      ...this.getState(),
      
    })
      addId.find(id => id === props.item._id) ? setAddId(addId.filter(id => id !== props.item._id)) : setAddId(prevState => [...prevState, props.item._id])

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

  state(newState) {
    this.setState(newState)
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
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
  async setParams(newParams = {}, replaceHistory = false) {
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
    let urlSearch = new URLSearchParams(exclude(params, this.initState().params)).toString();
    const url =
      window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
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

export default DuplicateCatalog;
