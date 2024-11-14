import { memo, useCallback, useMemo, useState } from 'react';
import Basket from '../../app/basket';
import Count from '../../components/count';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Modal from '../../containers/modal';
import useTranslate from '../../hooks/use-translate';
import FromBasket from '../../containers/from-basket';
import ModalLayout from '../../components/modal-layout';



function Modals() {
  const store = useStore()
  const select = useSelector(state => ({
    modalName: state.modals.name,
    callback: state.modals.callback
  }))

  const { t } = useTranslate();


  const onClose =() => store.actions.modals.close()

  const renders = {
    'basket': 
        <Basket />
      ,
    'push-count': 
        <Count 
            onSubmit={select.callback} 
            onClose={onClose}
            button={{add: "ОК", cancel: "Отмена"}}
        />
      ,
    'another-item': 
        <FromBasket 
            onSubmit={select.callback} 
        />
  };

  const params = {
    'basket': 
        {
          title: t('basket.title'),
          labelClose: t('basket.close')
        }

      ,
    'push-count': 
          {
            title: "",
            labelClose: "X"
          }
      ,
    'another-item': 
          {
            title: "Добавить товар",
            labelClose: t('basket.close')
          }
  }


  return (
    <>
        {select.modalName.map(modal => (
              <ModalLayout
                      key={modal}
                      title={params[modal].title}
                      labelClose={params[modal].labelClose}
                      onClose={onClose}
                      push={modal.includes("push") ? true : false}
              >
                <Modal  renderModal={renders[modal]}/>
              </ModalLayout>
        ))}
    </>
  )
  

}

export default memo(Modals);