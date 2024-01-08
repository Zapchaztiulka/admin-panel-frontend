import React from 'react';

const StatusRow = ({ title, onClick }) => {
  return (
    <div className="flex gap-xs2" onClick={onClick}>
      {title}
    </div>
  );
};

export default StatusRow;