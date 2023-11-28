import PropTypes from "prop-types";
import { Field } from "formik";
import { FormError } from "./FormError";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const LoginInput = ({
  name,
  type,
  text,
  valid,
  toogleShowPassword,
  showPassword,
  value,
}) => {
  return (
    <label className="relative">
      <span className="relative marker:mb-xs3 text-secondary leading-[1.4]">{text}</span>
      <Field
        name={name}
        type={type}
              className={` w-full p-xs  outline-1 outline outline-borderDefault -outline-offset-1 rounded-minimal text-[16px] bg-bgWhite  text-textInputActive  font-400 leading-[1.5]
          hover:bg-bgBrandLight1   autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] autofill:hover:shadow-[inset_0_0_0px_1000px_rgb(239,248,255)] ${
          valid ? "outline-textError" : "focus:outline-borderActive"
        } `}
          />
      <FormError name={name} />
      {type !== "email" && (
        <button
          type="button"
          onClick={toogleShowPassword}
          className="absolute top-m3 left-[311px]"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible
              title="Показати пароль"
              className={`w-s h-s ${
                value ? "fill-iconPrimary" : "fill-iconSecondary"
              } `}
            />
          ) : (
            <AiOutlineEye
              title="Сховати пароль"
              className={`w-s h-s ${
                value ? "fill-iconPrimary" : "fill-iconSecondary"
              } `}
            />
          )}
        </button>
      )}
    </label>
  );
};
LoginInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  showPassword: PropTypes.bool,
  toogleShowPassword: PropTypes.func,
  value: PropTypes.string,
};
