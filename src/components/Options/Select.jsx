import PropTypes from "prop-types";
import { useField } from "formik";

export const Select = ({ list, title, ...props }) => {
  const [field] = useField(props);

  return (
    <label className="flex flex-col gap-[4px]">
      <span>{title}</span>
      <select {...field} {...props}>
        {list.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </label>
  );
};

Select.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

// що потрібно передати в компонент                   
{/* <Select list={list} name={key}  title={title}/> */ }