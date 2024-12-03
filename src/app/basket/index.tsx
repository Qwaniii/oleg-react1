import React, { memo, useCallback } from 'react';
import { useDispatch, useStore as useStoreRedux } from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector.ts';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate.ts';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list/index.tsx';
import BasketTotal from '../../components/basket-total';
import Controls from '../../components/controls/index.tsx';
import { StoreConfig } from '../../store/types/store/index.ts';
import CatalogState from '../../store/catalog/index.ts';

type BasketProps = {

}

function Basket() {
  const store = useStore();
  
  const dispatch = useDispatch();
  
  const select = useSelector<StoreConfig>(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    catalog: state.catalog
  }));


  useInit(async() => {
    store.create<CatalogState>("newCatalog", "catalog", true)
    const newCatalog = await store.actions.modalCatalog.initParams( {}, false)
  }, [])


  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id) , [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      store.actions.modals.close();
      // dispatch(modalsActions.close());
    }, [store]),
    // Открытие модалки
    openModal: useCallback(async() => {
      const res = await store.actions.modals.open("another-item");
      if(res !== "close") {
        for (let id of res) {
        await store.actions.basket.addToBasket(id, 1)
      }
    }
    }, [store]),

  };

  const { t } = useTranslate();

  


  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={t('basket.unit')}
          labelDelete={t('basket.delete')}
        />
      ),
      [callbacks.removeFromBasket, t],
    ),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
      {select.amount > 0 && <Controls title="Добавить еще товар" onAdd={callbacks.openModal}/>}
    </>
  );
}

export default memo(Basket);
