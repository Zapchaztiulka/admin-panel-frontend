import Status from '@/components/Status/Status';
import Select from 'rc-select';
import 'rc-select/assets/index.css';
import CheckIcon from 'universal-components-frontend/src/components/icons/universalComponents/CheckIcon';

const StatusRow = ({ title,  value, options, onChange, onClose }) => {
  const styles = {
    ':hover': { background: '#F9F9F9' },
  };

  const handleStatusChange = (statusId) => {
    onChange(statusId, value);
    onClose();
  };

  return (
    <div className="flex gap-xs2">
      {title}
      <Select
        getRawInputElement={() => (
          <div>
            {value.length > 1 ? (
              <span className="cursor-pointer text-textBrand">
                Оберіть статус
              </span>
            ) : (
              <Status status={value[0].status} />
            )}
          </div>
        )}
        options={options}
        onChange={handleStatusChange}
        dropdownMatchSelectWidth={false}
        styles={styles}
        dropdownAlign={{points: ['c']}}
        allowClear
        dropdownClassName="rc-select-custom"
        menuItemSelectedIcon={<CheckIcon />}
      />
    </div>
  );
};

export default StatusRow;
