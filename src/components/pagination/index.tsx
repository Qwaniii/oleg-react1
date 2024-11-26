import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

interface PaginationProps {
  page: number,
  limit: number,
  count: number,
  indent: number,
  makeLink: (number: number) => string,
  onChange: (number: number) => void
}

function Pagination(props: PaginationProps) {
  const { page = 1, limit = 10, count = 1000, indent = 1 } = props;
  // Количество страниц
  const length: number = Math.ceil(count / Math.max(limit, 1));

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left: number = Math.max(props.page - indent, 1);
  let right: number = Math.min(left + indent * 2, length);
  // Корректировка когда страница в конце
  left = Math.max(right - indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let items: number[] = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > 2) items.push(null);
  // Последовательность страниц
  for (let pageNumber = left; pageNumber <= right; pageNumber++) items.push(pageNumber);
  // Пропуск
  if (right < length - 1) items.push(null);
  // Последняя страница
  if (right < length) items.push(length);

  const onClickHandler = (number: number) => (e: React.MouseEvent) => {
    if (props.onChange && number) {
      e.preventDefault();
      props.onChange(number);
    }
  };

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {items.map((number, index) => (
        <li
          key={index}
          className={cn('item', { active: number === page, split: !number })}
          onClick={onClickHandler(number)}
        >
          {number ? props.makeLink ? <a href={props.makeLink(number)}>{number}</a> : number : '...'}
        </li>
      ))}
    </ul>
  );
}

export default memo(Pagination);
