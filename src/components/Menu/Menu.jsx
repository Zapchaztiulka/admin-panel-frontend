import React from 'react';
import DefaultRow from './rows/DefaultRow';
import DividerRow from './rows/DividerRow';
import StatusRow from './rows/StatusRow';

const Menu = ({ items, selected = 0 }) => {
  return (
    <div
      className="p-m1 flex flex-col gap-xs shadow-tooltip rounded-medium 
      border border-borderDefault50 bg-bgWhite right-xl"
    >
      {selected > 0 && <div>Вибрано {selected} товарів:</div>}

      {items.map(({ type, ...otherProps }) => {
        let RowComponent;
        if (!type) type = 'default';
        switch (type) {
          case 'status':
            RowComponent = StatusRow;
            break;
          case 'divider':
            RowComponent = DividerRow;
            break;

          default:
            RowComponent = DefaultRow;
            break;
        }
        return <RowComponent {...otherProps} />;
      })}
    </div>
  );
};

export default Menu;
