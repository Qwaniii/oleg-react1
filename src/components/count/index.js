import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ModalPush from '../modal-push';

function Count({ onSubmit, onClose, button={add: "Ок", cancel: "Отмена"} }) {
  const cn = bem('Count');

  const [count, setCount] = useState(1)

  const onChange = (e) => {
    setCount(e.target.value)
  }

  const func = () => {
   onSubmit(Number(count))
  }
  return (
      <div className={cn()}>
        <div>Количество</div>
        <input className={cn("input")} min={1} max={1000} type="number" defaultValue={count} onChange={onChange}></input>
        <div className={cn("footer")}>
          <button disabled={count > 1000 || count < 1 ? "disabled" : ""} className={cn("success")} onClick={func}>{button.add}</button>
          <button onClick={onClose}>{button.cancel}</button>
        </div>
      </div>
  );
}



export default memo(Count);
