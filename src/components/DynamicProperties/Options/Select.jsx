import PropTypes from "prop-types";
import { useField } from "formik";
import { Dropdown, Multiselect } from "universal-components-frontend/src/components/select";
import FormField from "universal-components-frontend/src/components/FormField/FormField";

export const Select = ({ list, title, placeholder, setFieldValue, multiselect, ...props }) => {
  const [field] = useField(props);
  const onChange = (value) => {
    console.log(value);
    const newValue = multiselect ? value.map(el=>list[el]) : list[value];
    console.log(newValue);
    setFieldValue(field.name, newValue)
  }
  return (
    <FormField label={title}>
      {!multiselect && <Dropdown 
        {...field} 
        name={field.name}
        options={list}
        chosenOption={field.value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full"
        width="100%"
      />}

      {multiselect && <Multiselect 
        {...field} 
        name={field.name}
        options={list}
        // chosenOption={field.value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full"
        width="100%"
      />}
      
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