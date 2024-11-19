import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import Controls from '../../components/controls';
import useSelector from '../../hooks/use-selector';


function FromBasket({onSubmit}) {

  const store = useStore()

  const select = useSelector(state => ({
    list: state.duplicate.additionally
  }))

  const addNewItem = () => {
    store.actions.catalog.setInner()
    store.actions.duplicate.clearId()
    store.actions.duplicate.clearSelect()
    onSubmit(select.list)
  }

  

  return (
    <>
      <CatalogFilter />
      <CatalogList />
      <Controls title="Ок" onAdd={addNewItem}/>
    </>
  );
}

export default memo(FromBasket);
