import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector.ts';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item/index.tsx';
import List from '../../components/list/index.tsx';
import Pagination from '../../components/pagination/index.tsx';
import Spinner from '../../components/spinner';


function ModalCatalogList({modal}) {
  const store = useStore();


  const select = useSelector(state => ({
    modalPage: state?.modalCatalog?.params,
    modalLimit: state?.modalCatalog?.params,
    modalSort: state?.modalCatalog?.params,
    modalQuery: state?.modalCatalog?.params,
    modalCount: state?.modalCatalog?.count,
    countItem: state.basket.count,
    duplicateList: state?.modalCatalog?.list,
    additionally: state?.modalCatalog?.additionally
  }));

  const callbacks = {
    // Добавление в корзину
    addCount: useCallback(async(_id) => {
      const count = await store.actions.modals.open("push-count")
      count !== "close" ? store.actions.basket.addToBasket(_id, count) : null
    }, [store]),   
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Пагинация
    onPaginateModal: useCallback(page => store.actions.modalCatalog.setParams({ page }, false, false), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLinkModal: useCallback(
      page => {
        return `?${new URLSearchParams({
          page,
          limit: select.modalLimit.limit,
          sort: select.modalSort.sort,
          query: select.modalQuery.query,
        })}`;
      },
      [select.modalLimit, select.modalSort, select.modalQuery],
    ),
    selectAdd: (id) => {
      store.actions.modalCatalog.setSelect(id)
      store.actions.modalCatalog.addId(id)
    }
  };

  const { t } = useTranslate();

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          onAdd={callbacks.addCount}
          select={callbacks.selectAdd}
          color={select.additionally}
          link={`/articles/${item._id}`}
          labelAdd={t('article.add')}
          modal={modal}
        />
      ),
      [callbacks.addToBasket, t],
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <List list={select.duplicateList} renderItem={renders.item} />
      <Pagination
        count={select.modalCount}
        page={select.modalPage.page}
        limit={select.modalLimit.limitt}
        onChange={callbacks.onPaginateModal}
        makeLink={callbacks.makePaginatorLinkModal}
      />
    </Spinner>
  );
}

export default memo(ModalCatalogList);
