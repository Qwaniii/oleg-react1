import React , { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { Link } from 'react-router-dom';

interface ItemProps {
  onAdd: (id: string | number) => void,
  link: string,
  item: ItemInnerProps,
  labelCurr?: string,
  labelAdd?: string,
  select?: (id: string | number) => void,
  modal?: boolean,
}

interface ItemInnerProps {
  _id: string | number,
  title: string,
  price: number,
  selected: boolean
}

function Item(props : ItemProps) {
  const { onAdd = () => {}, labelCurr = '₽', labelAdd = 'Добавить', select=() => {}, modal=false }  = props;
  const cn = bem('Item');


  const callbacks = {
    onAdd:  () =>  onAdd(props.item._id),
    setSelect: () => {
      select(props.item._id)
    }
  };

  return (
    <div className={cn("", props.item.selected ? "selected" : "")} onClick={modal ? callbacks.setSelect : () => {}}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} {labelCurr}
        </div>
        {!modal && <button onClick={callbacks.onAdd}>{labelAdd}</button>}
      </div>
    </div>
  );
}

export default memo(Item);
