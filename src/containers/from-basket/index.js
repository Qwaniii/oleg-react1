import { memo } from 'react';
import useStore from '../../hooks/use-store';
import Controls from '../../components/controls';
import useSelector from '../../hooks/use-selector';
import ModalCatalogFilter from '../modal-catalog-filter';
import ModalCatalogList from '../modal-catalog-list';


function FromBasket({onSubmit}) {

  const store = useStore()

  const select = useSelector(state => ({
    list: state.modalCatalog.additionally
  }))

  const addNewItem = () => {
    store.actions.modalCatalog.clearId()
    store.actions.modalCatalog.clearSelect()
    onSubmit(select.list)
  }

  

  return (
    <>
      <ModalCatalogFilter />
      <ModalCatalogList modal={true}/>
      <Controls title="Ок" onAdd={addNewItem}/>
    </>
  );
}

export default memo(FromBasket);
