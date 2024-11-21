import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function ModalCatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    categories: state.categories.list,
    sortModal: state?.modalCatalog?.params,
    queryModal: state?.modalCatalog?.params,
    categoryModal: state?.modalCatalog?.params,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSortModal: useCallback(sort => store.actions.modalCatalog.setParams({ sort }, false, false), [store]),
    // Поиск
    onSearchModal: useCallback(query => store.actions.modalCatalog.setParams({ query, page: 1 }, false, false), [store]),
    // Сброс
    onResetModal: useCallback(() => store.actions.modalCatalog.resetParams(), [store], false, false),
    // Фильтр по категории
    onCategoryModal: useCallback(
      category =>
        store.actions.modalCatalog.setParams({
          category,
          page: 1,
        }, false, false),
      [store],
    ),
  };

  const options = {
    // Варианты сортировок
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    // Категории для фильтра
    categories: useMemo(
      () => [
        { value: '', title: 'Все' },
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: '- '.repeat(level) + item.title,
        })),
      ],
      [select.categories],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.categoryModal.category}
        onChange={callbacks.onCategoryModal}
      />
      <Select options={options.sort} 
              value={select.sortModal.sort} 
              onChange={callbacks.onSortModal} />
      <Input
        value={select.queryModal.query}
        onChange={callbacks.onSearchModal}
        placeholder={'Поиск'}
        delay={1000}
        theme={'big'}
      />
      <button onClick={callbacks.onResetModal}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(ModalCatalogFilter);
