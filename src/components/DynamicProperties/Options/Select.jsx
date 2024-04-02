import PropTypes from "prop-types";
import { useField } from "formik";
import { Dropdown, Multiselect } from "universal-components-frontend/src/components/select";
import FormField from "universal-components-frontend/src/components/FormField/FormField";

export const Select = ({ list, title, placeholder, setFieldValue, multiselect, validation, ...props }) => {
  const [field] = useField(props);
  const onChange = (value) => {
  const newValue = multiselect ? value.map(el=>list[el]) : list[value];
    setFieldValue(field.name, newValue)
  }
  
  return (
    <FormField label={title} isRequired={validation?.required}>
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