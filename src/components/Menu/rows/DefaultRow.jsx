import { useCallback } from 'react';

const DefaultRow = ({
  title,
  item,
  icon: IconComponent,
  iconProps,
  onClick,
  onClose,
}) => {
  const handleClick = useCallback(() => {
    onClick(item._id);
    onClose();
  }, [item]);

  return (
    <div className="flex gap-xs2 p-xs3 cursor-pointer hover:bg-bgHoverGrey" onClick={handleClick}>
      <IconComponent {...iconProps} />
      {title}
    </div>
  );
};

export default DefaultRow;
