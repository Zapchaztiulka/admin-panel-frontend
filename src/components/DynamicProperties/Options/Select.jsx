import PropTypes from "prop-types";
import { useField } from "formik";
import { Dropdown } from "universal-components-frontend/src/components/select";
import FormField from "universal-components-frontend/src/components/FormField/FormField";

export const Select = ({ list, title, placeholder, setFieldValue, ...props }) => {
  const [field] = useField(props);
  const onChange = (value) => {
    setFieldValue(field.name, list[value])
  }
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
    <FormField label={title}>
      <Dropdown 
        {...field} 
        name={field.name}
        options={list}
        chosenOption={field.value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full"
        width="100%"
      />
    </FormField>
    
  );
};

Select.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

// що потрібно передати в компонент                   
{/* <Select list={list} name={key} placeholder={placeholder}  title={title}/> */ }