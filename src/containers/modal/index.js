import { memo, useCallback, useMemo, useState } from 'react';
import Basket from '../../app/basket';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import Count from '../../components/count';
import useStore from '../../hooks/use-store';
import modalsActions from '../../store-redux/modals/actions';



function Modal() {
  const store = useStore()
  const dispatch = useDispatch()
  const activeModal = useSelectorRedux(state => state.modals.name);
  const onClose =() => dispatch(modalsActions.close())

  const handleConfirm = async(val) => {
    const id = await store.actions.basket.getCount()
    store.actions.basket.addToBasket(id, val)
    onClose()
    return store.actions.basket.getId(null)
  }


  return (
    <>
      {activeModal === 'basket' && <Basket />}
      {activeModal === 'count' && <Count 
                                      onSubmit={handleConfirm} 
                                      onClose={onClose}
                                      button={{add: "ОК", cancel: "Отмена"}}
                                      />}
    </>
  )
  

}

export default memo(Modal);