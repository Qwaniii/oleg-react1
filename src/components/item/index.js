import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { Link } from 'react-router-dom';

function Item(props) {
  const { onAdd = () => {}, labelCurr = '₽', labelAdd = 'Добавить', inner=false, select=() => {} } = props;
  const cn = bem('Item');

  const [addId, setAddId] = useState([])

  const callbacks = {
    onAdd:  (e) =>  onAdd(props.item._id),
    select: () => {
      select(props.item._id)
    }
  };

  console.log(addId)

  return (
    <div className={cn("", props.item.selected ? "selected" : "")} onClick={inner ? callbacks.select : () => {}}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} {labelCurr}
        </div>
        {!inner && <button onClick={callbacks.onAdd}>{labelAdd}</button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
};

export default memo(Item);
