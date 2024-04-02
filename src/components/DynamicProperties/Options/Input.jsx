import PropTypes from "prop-types";
import { useField } from "formik";
import { validateText } from "../../../utils/validateText";
import {Input as UniInput} from "universal-components-frontend/src/components/inputs";

export const Input = ({ validation, title, placeholder, ...props }) => {
  const [field, meta] = useField({
    ...props,
    validate: (value) => validateText(value, validation),
  });

  return (
    <UniInput 
      {...field}
      label={title}
      placeholder={placeholder}
      status={meta.error?.isWarning && meta.touched && "error"}
      asterisk={validation?.required} 
    />
  );
};

Input.propTypes = {
  validation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};