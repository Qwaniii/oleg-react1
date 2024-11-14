import { memo, useCallback, useMemo, useState } from 'react';
import Basket from '../../app/basket';
import Count from '../../components/count';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import ModalPush from '../../components/modal-push';
import ModalLayout from '../../components/modal-layout';



function Modal({renderModal = () => {}}) {

  return (
    <>
      {renderModal}
    </>
  )
  

}

export default memo(Modal);