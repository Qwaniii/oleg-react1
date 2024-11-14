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


  const select = useSelector(state => ({
    additionally: state.catalog.additionally
  }))
  const handleClick = (id) => {
    onSubmit(select.additionally)
  }

  return (
    <>
      <CatalogFilter />
      <CatalogList />
      <Controls title="Ок" onAdd={handleClick}/>
    </>
  );
}

export default memo(FromBasket);
