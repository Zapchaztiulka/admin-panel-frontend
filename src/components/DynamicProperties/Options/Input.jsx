import PropTypes from "prop-types";
import { useField } from "formik";
import { validateText } from "../../../utils/validateText";

export const Input = ({ validation, title, ...props }) => {
  const [field, meta] = useField({
    ...props,
    validate: (value) => validateText(value, validation),
  });
  // console.log(meta.error.warnings);
  return (
    <label className="flex flex-col gap-[4px]">
      <span>{title}</span>
      <input {...field} {...props} />
      {meta.error?.isWarning && meta.touched && (
        <div className="text-textSuccess">{meta.error.warnings}</div>
      )}
    </label>
  );
};

Input.propTypes = {
  validation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

// що потрібно передати в компонент
{/* <Input
  type={inputType(key)}
  name={key}
  placeholder={placeholder}
  title={title}
  validation={validation}
/>; */}
