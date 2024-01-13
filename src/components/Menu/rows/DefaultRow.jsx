import React, { useCallback } from 'react';

const DefaultRow = ({
  title,
  item,
  icon: IconComponent,
  iconProps,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    console.log('item', item);
    onClick(item._id);
  }, [item]);

  return (
    <div className="flex gap-xs2 p-xs3 cursor-pointer hover:bg-bgHoverGrey" onClick={handleClick}>
      <IconComponent {...iconProps} />
      {title}
    </div>
  );
};

export default DefaultRow;
