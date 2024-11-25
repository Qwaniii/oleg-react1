import React, { memo } from 'react';
import './style.css';

interface ListProps {
  renderItem: (item: ItemProps) => React.ReactNode,
  list: ItemProps[]
}

interface ItemProps {
  _id: string | number 
}

function List({ list, renderItem } : ListProps) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default memo(List);
