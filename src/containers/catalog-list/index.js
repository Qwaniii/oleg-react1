import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector.ts';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item/index.tsx';
import List from '../../components/list/index.tsx';
import Pagination from '../../components/pagination/index.tsx';
import Spinner from '../../components/spinner';
import { useDispatch } from 'react-redux';


function CatalogList() {
  const store = useStore();
  const dispatch = useDispatch();


  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    countItem: state.basket.count,
    inner: state.catalog.inner,
  }));

  const callbacks = {
    // Добавление в корзину
    addCount: useCallback(async(_id) => {
      const count = await store.actions.modals.open("push-count")
      count !== "close" ? store.actions.basket.addToBasket(_id, count) : null
    }, [store]),   
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Пагинация
    onPaginate: useCallback(page => store.actions.catalog.setParams({ page }), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback(
      page => {
        return `?${new URLSearchParams({
          page,
          limit: select.limit,
          sort: select.sort,
          query: select.query,
        })}`;
      },
      [select.limit, select.sort, select.query],
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
          inner={select.inner}
        />
      ),
      [callbacks.addToBasket, t],
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count}
        page={select.page}
        limit={select.limit}
        onChange={callbacks.onPaginate}
        makeLink={callbacks.makePaginatorLink}
      />
    </Spinner>
  );
}

export default memo(CatalogList);
