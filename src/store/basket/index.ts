import StoreModule from '../module.ts';

type BasketProps = {
  list: [],
  sum: number,
  amount: number,
  id: string | number
}

/**
 * Покупательская корзина
 */
class BasketState extends StoreModule {
  initState(): BasketProps {
    return {
      list: [],
      sum: 0,
      amount: 0,
      id: null
    };
  }

  /**
   * Добавление товара в корзину
   */
  async addToBasket(_id: string | number, count: number): Promise<void> {
      let sum: number = 0;
      // Ищем товар в корзине, чтобы увеличить его количество
      let exist: boolean = false;
      const list = this.getState().list.map(item => {
        let result: {
          _id: string,
          price: number,
          amount: number
        } = item;
        if (item._id === _id) {
          exist = true; // Запомним, что был найден в корзине
          result = { ...item, amount: item.amount + count };
        }
        sum += result.price * result.amount;
        return result;
      });
  
      if (!exist) {
        // Поиск товара в каталоге, чтобы его добавить в корзину.
        const res = await this.services.api.request({ url: `/api/v1/articles/${_id}` });
        const item = res.data.result;
  
        list.push({ ...item, amount: count }); // list уже новый, в него можно пушить.
        // Добавляем к сумме.
        sum += item.price * count;
      }
  
      this.setState(
        {
          ...this.getState(),
          list,
          sum,
          amount: list.length,
        },
        'Добавление в корзину',
      );
    
  }

  /**
   * Удаление товара из корзины
   */
  removeFromBasket(_id: string | number): void {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default BasketState;
