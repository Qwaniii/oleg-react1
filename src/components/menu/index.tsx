import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

interface MenuProps {
  items: ItemsProps[],
  onNavigate: (item: ItemsProps) => void
}

interface ItemsProps {
  key: number,
  title: string,
  link: string
}

function Menu({ items, onNavigate } : MenuProps) {
  const cn = bem('Menu');
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigate(item)}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default memo(Menu);
