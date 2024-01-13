import Status from '@/components/Status/Status';
import Select from 'rc-select';
import 'rc-select/assets/index.css';
import React from 'react';
import CheckIcon from 'universal-components-frontend/src/components/icons/universalComponents/CheckIcon';

const StatusRow = ({ title, item, options, onChange }) => {
  const styles = {
    ':hover': { background: '#F9F9F9' },
  };

  const handleStatusChange = (statusId) => {
    onChange(statusId, item._id)
  }

  return (
    <div className="flex gap-xs2">
      {title}
      <Select
        getRawInputElement={() => (
          <div>
            <Status status={item.status} />
          </div>
        )}
        options={options}
        onChange={handleStatusChange}
        dropdownMatchSelectWidth={false}
        styles={styles}
        value={item.status}
        allowClear
        dropdownClassName="rc-select-custom"
        menuItemSelectedIcon={<CheckIcon />}
      />
    </div>
  );
};

export default StatusRow;
