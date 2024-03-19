import PropTypes from "prop-types";
import { useField } from "formik";
import { Dropdown } from "universal-components-frontend/src/components/select";

export const Select = ({ list, title, placeholder, ...props }) => {
  const [field] = useField(props);

  return (
    // <label className="flex flex-col gap-[4px]">
    //   <span>{title}</span>
    //   <select {...field} {...props}>
    //     {list.map((role) => (
    //       <option key={role} value={role}>
    //         {role}
    //       </option>
    //     ))}
    //   </select>
    // </label>
    <Dropdown 
      {...field}
      options={list}
      label={title}
      placeholder={placeholder}
      onChange={(v)=>console.log(v)}
      className="flex flex-col gap-[4px]"
    />
  );
};

Select.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

// що потрібно передати в компонент                   
{/* <Select list={list} name={key} placeholder={placeholder}  title={title}/> */ }