import { useDispatch } from "react-redux";
import { useState } from "react";
import modalsActions from '../store-redux/modals/actions';


export default function useModal() {
  
  const dispatch = useDispatch()
  const [value, setValue] = useState(1)
  const [modal, setModal] = useState(false)
  const [promiseInfo, setPromiseInfo] = useState(null)
      

      const open = () => {
        return new Promise((resolve, reject) => {
          setPromiseInfo(() => resolve)
        })
      }

      const getValue = (val) => {
        setValue(val)
      }

      // const handleConfirm = () => {
      //   return new Promise((resolve, reject) => {
      //     getValue()
      //     if(value) resolve(value)
      //   })
      // };


      return {open , value}
}
