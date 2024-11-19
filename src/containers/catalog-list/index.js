import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';
import { useDispatch } from 'react-redux';
import modalsActions from '../../store-redux/modals/actions';
import useModal from '../../hooks/use-modal';


function CatalogList() {
  const store = useStore();
  const dispatch = useDispatch();


  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    modalPage: state.duplicate.params,
    limit: state.catalog.params.limit,
    modalLimit: state.duplicate.params,
    sort: state.catalog.params.sort,
    modalSort: state.duplicate.params,
    query: state.catalog.params.query,
    modalQuery: state.duplicate.params,
    count: state.catalog.count,
    modalCount: state.duplicate.count,
    waiting: state.catalog.waiting,
    countItem: state.basket.count,
    inner: state.catalog.inner,
    duplicateList: state.duplicate.list,
    additionally: state.duplicate.additionally
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
    onPaginateModal: useCallback(page => store.actions.duplicate.setParams({ page }), [store]),
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
      store.actions.duplicate.setSelect(id)
      store.actions.duplicate.addId(id)
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
      <List list={select.inner ? select.duplicateList : select.list} renderItem={renders.item} />
      <Pagination
        count={select.inner ? select.modalCount : select.count}
        page={select.inner ? select.modalPage.page : select.page}
        limit={select.inner ? select.modalLimit.limit : select.limit}
        onChange={select.inner ? callbacks.onPaginateModal : callbacks.onPaginate}
        makeLink={select.inner ? callbacks.makePaginatorLinkModal : callbacks.makePaginatorLink}
      />
    </Spinner>
  );
}

export default memo(CatalogList);
