import PropTypes from "prop-types";
import { useField } from "formik";
import { Dropdown, Multiselect } from "universal-components-frontend/src/components/select";
import FormField from "universal-components-frontend/src/components/FormField/FormField";
import { validateText } from "@/utils";

export const Select = ({ list, title, placeholder, setFieldValue, multiselect, validation, infoMessage, ...props }) => {
  const [field, meta] = useField({
    ...props,
    validate: (value) => validateText(value, validation),
  });
  const onChange = (value) => {
  const newValue = multiselect ? value.map(el=>list[el]) : list[value];
    setFieldValue(field.name, newValue)
  }
  
  return (
    <FormField 
      label={title} 
      isRequired={validation?.required}
      message={meta.touched ? meta.error?.isWarning ? meta.error?.warnings : undefined : infoMessage}
      hasMessage = {meta.touched ? meta.error?.isWarning ? "error" : "success" : infoMessage}
      status = {meta.touched ? meta.error?.isWarning ? "error" : "success" : "info"}
    >

      {!multiselect && <Dropdown 
        {...field} 
        name={field.name}
        options={list}
        chosenOption={field.value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full"
        width="100%"
        isSuccess={meta.touched && !meta.error?.isWarning}
        isError={meta.touched && meta.error?.isWarning}
      />}

      {multiselect && <Multiselect 
        {...field} 
        name={field.name}
        options={list}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full"
        width="100%"
        isSuccess={meta.touched && !meta.error?.isWarning}
        isError={meta.touched && meta.error?.isWarning}
      />}
      
    </FormField>
    
  );
};

Select.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
};