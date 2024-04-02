import PropTypes from "prop-types";
import { useField } from "formik";
import { validateText } from "../../../utils/validateText";
import {Input as UniInput} from "universal-components-frontend/src/components/inputs";

export const Input = ({ validation, title, placeholder, infoMessage, ...props }) => {
  const [field, meta] = useField({
    ...props,
    validate: (value) => validateText(value, validation),
  });

  if(field.name === "name") console.log(field, meta);
  return (
    <UniInput 
      {...field}
      label={title}
      placeholder={placeholder}
      status={meta.touched ? meta.error?.isWarning ? "error" : "success" : "field"}
      message={meta.touched ? meta.error?.isWarning ? meta.error?.warnings : undefined : infoMessage}
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