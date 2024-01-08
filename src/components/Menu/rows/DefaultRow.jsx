import React from 'react';

const DefaultRow = ({ title, icon: IconComponent, onClick }) => {
  return (
    <div className="flex gap-xs2" onClick={onClick}>
      <IconComponent />
      {title}
    </div>
  );
};

export default DefaultRow;
