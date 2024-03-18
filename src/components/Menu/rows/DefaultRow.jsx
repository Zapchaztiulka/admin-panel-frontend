import { useCallback } from 'react';

const DefaultRow = ({
  title,
  value,
  icon: IconComponent,
  iconProps,
  onClick,
  onClose,
}) => {
  const handleClick = useCallback(() => {
    onClick(value);
    onClose();
  }, [value]);

  return (
    <div className="flex gap-xs2 p-xs3 cursor-pointer hover:bg-bgHoverGrey" onClick={handleClick}>
      <IconComponent {...iconProps} />
      {title}
    </div>
  );
};

export default DefaultRow;
