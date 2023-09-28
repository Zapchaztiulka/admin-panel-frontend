import PropTypes from "prop-types";
import { useField } from "formik";

export const CheckBox = ({title, ...props }) => {
  const [field] = useField(props);

  return (
    <label className="flex  gap-[4px]">
            <input {...field} {...props} />
      <span>{title}</span>
    </label>
  );
};

CheckBox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

// що потрібно передати в компонент                   
{/* <Select list={list} name={key}  title={title}/> */ }
//  <CheckBox type='checkbox' name={key} value={key} title={title}