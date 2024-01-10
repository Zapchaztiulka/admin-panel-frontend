import React from 'react';

const DefaultRow = ({ title, icon: IconComponent,iconProps, onClick }) => {
  return (
    <div className="flex gap-xs2 p-xs3" onClick={onClick}>
      <IconComponent {...iconProps}/>
      {title}
    </div>
  );
};

export default DefaultRow;
