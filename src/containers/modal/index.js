import { memo, useCallback, useMemo, useState } from 'react';



function Modal({renderModal = (modal) => {}, modal = null}) {

  return (
    <div>
      {renderModal(modal)}
    </div>
  )
  

}

export default memo(Modal);