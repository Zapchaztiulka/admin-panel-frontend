import DefaultRow from './rows/DefaultRow';
import DividerRow from './rows/DividerRow';
import StatusRow from './rows/StatusRow';

const Menu = ({ items, value, selected = 0, onClose = () => {} }) => {
  return (
    <div className="flex flex-col gap-xs">
      {selected > 0 && <div>Вибрано {selected} товарів:</div>}

      {items.map(({ type, ...otherProps }, indx) => {
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
        return (
          <RowComponent
            {...otherProps}
            value={value}
            key={indx}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
};

export default Menu;
